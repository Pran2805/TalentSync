// src/utils/piston.ts
import axios from "axios";

// Piston API endpoint
const PISTON_API = "https://emkc.org/api/v2/piston";

// Extended language versions with more programming languages
export const LANGUAGE_VERSION = {
    javascript: {
        language: "javascript",
        version: "18.15.0"
    },
    typescript: {
        language: "typescript",
        version: "5.0.3"
    },
    python: {
        language: "python",
        version: "3.10.0"
    },
    java: {
        language: "java",
        version: "15.0.2"
    },
    c: {
        language: "c",
        version: "10.2.0"
    },
    cpp: {
        language: "cpp",
        version: "10.2.0"
    },
    csharp: {
        language: "csharp",
        version: "6.12.0"
    },
    go: {
        language: "go",
        version: "1.16.2"
    },
    rust: {
        language: "rust",
        version: "1.68.2"
    },
    php: {
        language: "php",
        version: "8.2.3"
    },
    ruby: {
        language: "ruby",
        version: "3.0.1"
    },
    swift: {
        language: "swift",
        version: "5.3.3"
    },
    kotlin: {
        language: "kotlin",
        version: "1.4.31"
    },
    r: {
        language: "r",
        version: "4.1.2"
    },
    bash: {
        language: "bash",
        version: "5.1.0"
    },
    sql: {
        language: "sql",
        version: "2.7.0"
    }
};

export interface ExecutionResult {
    success: boolean;
    output?: string;
    error?: string;
    executionTime?: number;
}

export default async function executeCode(language: string, code: string): Promise<ExecutionResult> {
    try {
        const languageConfig = LANGUAGE_VERSION[language as keyof typeof LANGUAGE_VERSION];

        if (!languageConfig) {
            return {
                success: false,
                error: `Unsupported language: ${language}. Supported languages: ${Object.keys(LANGUAGE_VERSION).join(", ")}`
            };
        }

        const response = await axios.post(`${PISTON_API}/execute`, {
            language: languageConfig.language,
            version: languageConfig.version,
            files: [
                {
                    name: `main.${getFileExtension(language)}`,
                    content: code
                }
            ]
        });

        if (response.status !== 200) {
            return {
                success: false,
                error: `HTTP error! status: ${response.status}`
            };
        }

        const data = response.data;
        const output = data.run?.output?.trim() || "";
        const stderr = data.run?.stderr?.trim() || "";
        const stdout = data.run?.stdout?.trim() || "";

        // Combine stdout and output (some languages use stdout, others use output)
        const finalOutput = stdout || output;

        if (stderr) {
            return {
                success: false,
                output: finalOutput,
                error: stderr
            };
        }

        return {
            success: true,
            output: finalOutput,
            executionTime: data.run?.time || 0
        };
    } catch (error: any) {
        console.error("Code execution error:", error);
        
        if (axios.isAxiosError(error)) {
            return {
                success: false,
                error: `API request failed: ${error.response?.data?.message || error.message}`
            };
        }
        
        return {
            success: false,
            error: `Unexpected error: ${error.message}`
        };
    }
}

function getFileExtension(language: string): string {
    const extensions: { [key: string]: string } = {
        javascript: "js",
        typescript: "ts",
        python: "py",
        java: "java",
        c: "c",
        cpp: "cpp",
        csharp: "cs",
        go: "go",
        rust: "rs",
        php: "php",
        ruby: "rb",
        swift: "swift",
        kotlin: "kt",
        r: "r",
        bash: "sh",
        sql: "sql"
    };
    
    return extensions[language] || "txt";
}

// Utility function to get all supported languages
export function getSupportedLanguages(): string[] {
    return Object.keys(LANGUAGE_VERSION);
}

// Utility function to get language info
export function getLanguageInfo(language: string) {
    return LANGUAGE_VERSION[language as keyof typeof LANGUAGE_VERSION];
}