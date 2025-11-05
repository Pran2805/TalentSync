import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PROBLEMS, type Problem } from "@/data/problems";
import executeCode from "@/utils/piston";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import confetti from "canvas-confetti";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { Play, ChevronLeft, ChevronRight, CheckCircle, XCircle, AlertCircle } from "lucide-react";

interface ExecutionResult {
    success: boolean;
    output?: string;
    error?: string;
    executionTime?: number;
}

export default function ProblemPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [currentProblemId, setCurrentProblemId] = useState<string>("two-sum");
    const [selectedLanguage, setSelectedLanguage] = useState<string>("javascript");
    const [code, setCode] = useState<string>("");
    const [output, setOutput] = useState<ExecutionResult | null>(null);
    const [isRunning, setIsRunning] = useState<boolean>(false);

    const currentProblem: Problem | undefined = PROBLEMS[currentProblemId];
    const problemIds = Object.keys(PROBLEMS);
    const currentIndex = problemIds.indexOf(currentProblemId);
    const hasPrevious = currentIndex > 0;
    const hasNext = currentIndex < problemIds.length - 1;

    // Available languages - only show languages that have starter code
    const availableLanguages = currentProblem
        ? Object.keys(currentProblem.starterCode)
        : ["javascript", "python", "java"];

    const languages = [
        { value: "javascript", label: "JavaScript" },
        { value: "python", label: "Python" },
        { value: "java", label: "Java" },
    ].filter(lang => availableLanguages.includes(lang.value));

    // Update problem when URL param changes
    useEffect(() => {
        if (id && PROBLEMS[id]) {
            setCurrentProblemId(id);
            const problem = PROBLEMS[id];
            const starterCode = problem.starterCode[selectedLanguage] || problem.starterCode.javascript || "// Write your code here";
            setCode(starterCode);
            setOutput(null);
        }
    }, [id, selectedLanguage]);

    const handleLanguageChange = (value: string) => {
        setSelectedLanguage(value);
        if (currentProblem) {
            const starterCode = currentProblem.starterCode[value] || `// ${value} starter code not available`;
            setCode(starterCode);
        }
        setOutput(null);
    };

    const handlePreviousProblem = () => {
        if (hasPrevious) {
            const prevId = problemIds[currentIndex - 1];
            navigate(`/problem/${prevId}`);
        }
    };

    const handleNextProblem = () => {
        if (hasNext) {
            const nextId = problemIds[currentIndex + 1];
            navigate(`/problem/${nextId}`);
        }
    };

    const triggerConfetti = () => {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });
    };

    const normalizeOutput = (output: string): string => {
        return output
            .trim()
            .split("\n")
            .map((line) =>
                line
                    .trim()
                    .replace(/\[\s+/g, "[")
                    .replace(/\s+\]/g, "]")
                    .replace(/\s*,\s*/g, ",")
            )
            .filter((line) => line.length > 0)
            .join("\n");
    };

    const checkIfTestsPassed = (actualOutput: string, expectedOutput: string): boolean => {
        const normalizedActual = normalizeOutput(actualOutput);
        const normalizedExpected = normalizeOutput(expectedOutput);
        return normalizedActual === normalizedExpected;
    };

    const handleRunCode = async () => {
        if (!currentProblem) return;

        setIsRunning(true);
        setOutput(null);

        try {
            const result = await executeCode(selectedLanguage, code);
            setOutput(result);

            if (result.success) {
                const expectedOutput = currentProblem.expectedOutput[selectedLanguage];
                if (expectedOutput && result.output) {
                    const testsPassed = checkIfTestsPassed(result.output, expectedOutput);
                    if (testsPassed) {
                        triggerConfetti();
                        toast.success("All tests passed! 🎉", {
                            description: "Great job! Your solution is correct."
                        });
                    } else {
                        toast.error("Tests failed", {
                            description: "Your output doesn't match the expected result."
                        });
                    }
                } else {
                    toast.info("Code executed successfully", {
                        description: expectedOutput ? "No output to compare with expected result." : "No tests available for this language."
                    });
                }
            } else {
                toast.error("Execution failed", {
                    description: result.error || "Unknown error occurred"
                });
            }
        } catch (error) {
            toast.error("Execution error", {
                description: "Failed to execute code"
            });
        } finally {
            setIsRunning(false);
        }
    };

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case "Easy": return "bg-emerald-500/20 text-emerald-300 border-emerald-500/30";
            case "Medium": return "bg-amber-500/20 text-amber-300 border-amber-500/30";
            case "Hard": return "bg-rose-500/20 text-rose-300 border-rose-500/30";
            default: return "bg-gray-500/20 text-gray-300 border-gray-500/30";
        }
    };

    if (!currentProblem) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <Card className="w-96 glass border-primary/20">
                    <CardContent className="pt-6 flex flex-col items-center space-y-4">
                        <AlertCircle className="h-12 w-12 text-primary/60" />
                        <p className="text-center text-muted-foreground">Problem not found</p>
                        <Button onClick={() => navigate("/")} className="bg-primary hover:bg-primary/90">
                            Go Home
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="h-screen bg-linear-to-br from-background via-background to-slate-950 flex flex-col">
            <header className="border-b border-border/40 bg-card/30 backdrop-blur-sm">
                <div className="container mx-auto px-4 py-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <h1 className="text-2xl font-bold bg-linear-to-r from-primary via-purple-500 to-cyan-400 bg-clip-text text-transparent bg-300% animate-gradient">
                                {currentProblem.title}
                            </h1>
                            <Badge
                                variant="secondary"
                                className={`border ${getDifficultyColor(currentProblem.difficulty)} font-medium`}
                            >
                                {currentProblem.difficulty}
                            </Badge>
                            <span className="text-sm text-muted-foreground bg-muted/50 px-3 py-1 rounded-full">
                                {currentProblem.category}
                            </span>
                        </div>

                        <div className="flex items-center space-x-3">
                            <Select value={selectedLanguage} onValueChange={handleLanguageChange}>
                                <SelectTrigger className="w-32 bg-popover border-border/60">
                                    <SelectValue placeholder="Language" />
                                </SelectTrigger>
                                <SelectContent className="bg-popover border-border/60">
                                    {languages.map((lang) => (
                                        <SelectItem key={lang.value} value={lang.value} className="hover:bg-accent">
                                            {lang.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            <div className="flex space-x-1">
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={handlePreviousProblem}
                                    disabled={!hasPrevious}
                                    className="border-border/60 hover:bg-accent/50"
                                >
                                    <ChevronLeft className="h-4 w-4" />
                                </Button>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={handleNextProblem}
                                    disabled={!hasNext}
                                    className="border-border/60 hover:bg-accent/50"
                                >
                                    <ChevronRight className="h-4 w-4" />
                                </Button>
                            </div>

                            <Button
                                onClick={handleRunCode}
                                disabled={isRunning}
                                className="gap-2 bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20"
                            >
                                <Play className="h-4 w-4" />
                                {isRunning ? "Running..." : "Run Code"}
                            </Button>
                        </div>
                    </div>
                </div>
            </header>

            <div className="flex-1">
                <PanelGroup direction="horizontal" className="h-full">
                    {/* Problem Description Panel */}
                    <Panel defaultSize={40} minSize={30}>
                        <ScrollArea className="h-full p-6">
                            <div className="space-y-6">
                                <div className="glass rounded-xl p-6 border border-border/40">
                                    <h2 className="text-lg font-semibold mb-3 text-card-foreground">Description</h2>
                                    <p className="text-muted-foreground leading-relaxed">
                                        {currentProblem.description.text}
                                    </p>
                                    {currentProblem.description.notes.length > 0 && (
                                        <div className="mt-4 space-y-2">
                                            {currentProblem.description.notes.map((note, index) => (
                                                <p key={index} className="text-sm text-muted-foreground bg-muted/30 px-3 py-2 rounded-lg">
                                                    💡 {note}
                                                </p>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                <Separator className="bg-border/40" />

                                <div>
                                    <h3 className="text-lg font-semibold mb-3 text-card-foreground">Examples</h3>
                                    <div className="space-y-4">
                                        {currentProblem.examples.map((example, index) => (
                                            <Card key={index} className="bg-muted/20 border-border/40">
                                                <CardContent className="pt-6">
                                                    <div className="space-y-3">
                                                        <div>
                                                            <span className="font-medium text-card-foreground">Input: </span>
                                                            <code className="bg-muted px-3 py-2 rounded-lg text-sm font-mono border border-border/40 block mt-2">
                                                                {example.input}
                                                            </code>
                                                        </div>
                                                        <div>
                                                            <span className="font-medium text-card-foreground">Output: </span>
                                                            <code className="bg-muted px-3 py-2 rounded-lg text-sm font-mono border border-border/40 block mt-2">
                                                                {example.output}
                                                            </code>
                                                        </div>
                                                        {example.explanation && (
                                                            <div>
                                                                <span className="font-medium text-card-foreground">Explanation: </span>
                                                                <span className="text-muted-foreground">
                                                                    {example.explanation}
                                                                </span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>
                                </div>

                                <Separator className="bg-border/40" />

                                <div>
                                    <h3 className="text-lg font-semibold mb-3 text-card-foreground">Constraints</h3>
                                    <ul className="space-y-2 text-sm text-muted-foreground">
                                        {currentProblem.constraints.map((constraint, index) => (
                                            <li key={index} className="flex items-start bg-muted/20 px-4 py-3 rounded-lg border border-border/40">
                                                <span className="text-primary mr-3">•</span>
                                                <span>{constraint}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <Separator className="bg-border/40" />

                                <div>
                                    <h3 className="text-lg font-semibold mb-3 text-card-foreground">Expected Output</h3>
                                    <Card className="bg-muted/20 border-border/40">
                                        <CardContent className="pt-6">
                                            <pre className="bg-muted px-4 py-3 rounded-lg overflow-x-auto text-sm font-mono border border-border/40">
                                                {currentProblem.expectedOutput[selectedLanguage] || "Not available for this language"}
                                            </pre>
                                        </CardContent>
                                    </Card>
                                </div>
                            </div>
                        </ScrollArea>
                    </Panel>

                    <PanelResizeHandle className="w-2 bg-gradient-to-b from-primary/30 to-accent/30 hover:from-primary/50 hover:to-accent/50 transition-all cursor-col-resize" />

                    <Panel defaultSize={60} minSize={30}>
                        <PanelGroup direction="vertical">
                            <Panel defaultSize={70} minSize={30}>
                                <Card className="h-full flex flex-col bg-card border-border/40">
                                    <CardContent className="flex-1 p-0">
                                        <Tabs defaultValue="editor" className="h-full">
                                            <TabsList className="mx-4 mt-4 bg-muted/50 border-border/40">
                                                <TabsTrigger value="editor" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                                                    Editor
                                                </TabsTrigger>
                                            </TabsList>
                                            <TabsContent value="editor" className="h-[calc(100%-3rem)] mt-0">
                                                <textarea
                                                    value={code}
                                                    onChange={(e) => setCode(e.target.value)}
                                                    className="w-full h-full font-mono text-sm p-6 resize-none focus:outline-none bg-muted/30 text-card-foreground border-0"
                                                    spellCheck="false"
                                                    placeholder="Write your code here..."
                                                />
                                            </TabsContent>
                                        </Tabs>
                                    </CardContent>
                                </Card>
                            </Panel>

                            <PanelResizeHandle className="h-2 bg-gradient-to-r from-primary/30 to-accent/30 hover:from-primary/50 hover:to-accent/50 transition-all cursor-row-resize" />

                            {/* Output Panel */}
                            <Panel defaultSize={30} minSize={30}>
                                <Card className="h-full flex flex-col bg-card border-border/40">
                                    <CardHeader className="pb-3">
                                        <CardTitle className="text-lg text-card-foreground">Output</CardTitle>
                                    </CardHeader>
                                    <CardContent className="flex-1 p-0">
                                        <ScrollArea className="h-full">
                                            <div className="p-4">
                                                {isRunning ? (
                                                    <div className="flex items-center space-x-3 text-muted-foreground">
                                                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-primary border-t-transparent"></div>
                                                        <span>Running your code...</span>
                                                    </div>
                                                ) : output ? (
                                                    <div className="space-y-4">
                                                        <div className="flex items-center space-x-3">
                                                            {output.success ? (
                                                                <>
                                                                    <CheckCircle className="h-6 w-6 text-emerald-400" />
                                                                    <span className="font-medium text-emerald-400">Execution Successful</span>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <XCircle className="h-6 w-6 text-rose-400" />
                                                                    <span className="font-medium text-rose-400">Execution Failed</span>
                                                                </>
                                                            )}
                                                            {output.executionTime && (
                                                                <Badge variant="outline" className="ml-auto bg-primary/20 text-primary border-primary/30">
                                                                    {output.executionTime}ms
                                                                </Badge>
                                                            )}
                                                        </div>

                                                        <div>
                                                            <h4 className="font-medium mb-2 text-card-foreground">Output:</h4>
                                                            <pre className="bg-muted/50 p-4 rounded-lg overflow-x-auto text-sm font-mono whitespace-pre-wrap border border-border/40">
                                                                {output.output || output.error || "No output"}
                                                            </pre>
                                                        </div>

                                                        {output.success && currentProblem.expectedOutput[selectedLanguage] && output.output && (
                                                            <div className="flex items-center space-x-3 text-sm">
                                                                <span className="font-medium text-card-foreground">Test Result:</span>
                                                                {checkIfTestsPassed(
                                                                    output.output,
                                                                    currentProblem.expectedOutput[selectedLanguage]
                                                                ) ? (
                                                                    <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30">
                                                                        ✅ All Tests Passed
                                                                    </Badge>
                                                                ) : (
                                                                    <Badge className="bg-rose-500/20 text-rose-300 border-rose-500/30">
                                                                        ❌ Tests Failed
                                                                    </Badge>
                                                                )}
                                                            </div>
                                                        )}
                                                    </div>
                                                ) : (
                                                    <div className="text-center py-8 text-muted-foreground">
                                                        <Play className="h-12 w-12 mx-auto mb-3 opacity-40" />
                                                        <p>Run your code to see the output here</p>
                                                    </div>
                                                )}
                                            </div>
                                        </ScrollArea>
                                    </CardContent>
                                </Card>
                            </Panel>
                        </PanelGroup>
                    </Panel>
                </PanelGroup>
            </div>
        </div>
    );
}