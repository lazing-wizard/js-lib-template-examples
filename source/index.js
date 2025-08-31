
export default
function example_hash(source) {
    let hash = 0;
    for (const char of source) {
        hash = (hash << 4) - hash + char.charCodeAt(0)*2152534153;
        hash |= 0;
    }
    return hash;
}
