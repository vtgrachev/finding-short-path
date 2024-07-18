export const getPath = (paths: Record<string, string | null>, end: string) => {
    const endPath = Object.keys(paths).find((key) => key === end);

    if (endPath == null) return [];

    let startPath = paths[endPath] ?? null;

    const resultPath = [endPath, startPath];

    while (startPath !== null) {
        const lastPath = startPath;

        startPath = paths[startPath];

        resultPath.push(startPath ?? lastPath);
    }

    return resultPath.reverse();
};
