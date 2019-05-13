import PlatformTools from "./PlatformTools";

/**
 * Loads all exported classes from the given directory.
 */
export function importClassesFromDirectories(directories: string[], formats = [".js", ".ts"]): Array<() => void> {

    const loadFileClasses = (exported: any, allLoaded: Array<() => void>) => {
        if (typeof exported === "function") {
            allLoaded.push(exported);

        } else if (Array.isArray(exported)) {
            exported.forEach((i: any) => loadFileClasses(i, allLoaded));

        } else if (typeof exported === "object" && exported !== null) {
            Object.keys(exported).forEach((key) => loadFileClasses(exported[key], allLoaded));

        }
        return allLoaded;
    };

    const allFiles = directories.reduce((allDirs, dir) => {
        return allDirs.concat(PlatformTools.load("glob").sync(PlatformTools.pathNormalize(dir)));
    }, [] as string[]);

    const dirs = allFiles
        .filter((file) => {
            const dtsExtension = file.substring(file.length - 5, file.length);
            return formats.indexOf(PlatformTools.pathExtname(file)) !== -1 && dtsExtension !== ".d.ts";
        })
        .map((file) => PlatformTools.load(PlatformTools.pathResolve(file)));

    return loadFileClasses(dirs, []);
}