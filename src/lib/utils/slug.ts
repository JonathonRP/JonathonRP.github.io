export default String.prototype.asSlug = function() {
    return this.normalize().toLowerCase().replace(' ', '-');
}

export function slug(str: string) {
    return str.normalize().toLowerCase().replace(' ', '-');
}