export const SpellText = (text) => {
    console.log(text)
    let splitText = text.split(' ');
    let maxWords = splitText.slice(0, 2);
    let mapText = maxWords.map(name => {
        return name.substring(0, 1);
    });

    return mapText.join('');
};