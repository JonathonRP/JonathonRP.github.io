export default String.prototype.asSlug = function() {
    return slug(this.substring(0));
}

function slug(str: string) {
    return str.normalize().toLowerCase().replace(' ', '-');
}