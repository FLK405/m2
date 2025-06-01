export function html(template: TemplateStringsArray, ...args: any[]): string {
    return String.raw(template, ...args);
}
