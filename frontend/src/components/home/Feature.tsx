import { Brain, Clock, Code, Shield, Users, Video } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { useMemo } from "react"

function Feature() {
    const features = useMemo(() => [
        {
            icon: Code,
            title: "Real-time Code Editor",
            description: "Collaborative coding environment with syntax highlighting and multiple language support",
            subpoints: [
                "Live code execution",
                "3+ programming languages",
                "Auto-completion"
            ]
        }, {
            icon: Video,
            title: "HD Video Calls",
            description: "Crystal clear video and audio with screen sharing and recording capabilities",
            subpoints: [
                "1080p HD quality",
                "Screen sharing",
                "Session recording"
            ]
        },{
            icon: Brain,
            title: "AI Assessment",
            description: "Intelligent code analysis and performance metrics with detailed feedback",
            subpoints: [
                "Code quality analysis",
                "Performance metrics",
                "Smart suggestions"
            ]
        },{
            icon: Users,
            title: "Team Collaboration",
            description: "Multiple interviewers can join sessions and provide collective feedback",
            subpoints: [
                "Multiple interviewers",
                "Real-time notes",
                "Rating system"
            ]
        },{
            icon: Shield,
            title: "Secure & Private",
            description: "Enterprise-grade security with end-to-end encryption and data protection",
            subpoints:[
                "End-to-end encryption",
                "GDPR compliant",
                "Data protection"
            ]
        },{
            icon: Clock,
            title: "Time Management",
            description: "Built-in timer, code execution time tracking, and automated session management",
            subpoints: [
                "Built-in timer",
                "Code execution time",
                "Auto session end"
            ]
        }
    ], []);

    const headerContent = useMemo(() => (
        <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold">
                Everything You Need for
                <span className="bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent block">
                    Modern Interviews
                </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Powerful features designed to make technical interviews efficient and effective
            </p>
        </div>
    ), []);

    const featuresGrid = useMemo(() => (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
                <Card key={index} className="bg-card border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg">
                    <CardHeader>
                        <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                            <feature.icon className="size-6 text-primary" />
                        </div>
                        <CardTitle>{feature.title}</CardTitle>
                        <CardDescription>
                            {feature.description}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            {feature.subpoints.map((subpoint, subIndex) => (
                                <li className="flex items-center gap-2" key={subIndex}>
                                    <div className="size-1.5 rounded-full bg-primary" />
                                    {subpoint}
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            ))}
        </div>
    ), [features]);

    return (
        <section className="py-20 lg:py-32 bg-muted/20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {headerContent}
                {featuresGrid}
            </div>
        </section>
    )
}

export default Feature