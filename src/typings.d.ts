declare var process: Process;

interface Process {
    env: Env
}

interface Env {
    PUBLIC_KEY: string
    PRIV_KEY: string
}

interface GlobalEnvironment{
    process: Process;
}