/*

SENG 513 - Web Based Systems
Mingxi (Logan) Ruan, 10122318

*/
function getStats(txt) {

    // Convert the argument to lower case.  This saves a lot of headaches.
    txtParsed = txt.toLowerCase();
    txtParsed = txtParsed.trim();

    let lines = txtParsed.split("\n");
    let words = splitWords(txtParsed);
    let maxLineLength = 0;

    // Reference for set declaration:   https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set
    // And:                             https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_operator
    let uniqueWords = [...new Set(words)];

    let nNonEmptyLines = 0;
    for(let i = 0; i < lines.length; i++) {
        if(lines[i] != "")
        {
            nNonEmptyLines += 1;
        }
        if(lines[i].length > maxLineLength)
        {
            maxLineLength = lines[i].length;
        }
    }

    let nChars = txt.length;
    let nLines = lines.length;
    let nWords = words.length;
    let averageWordLength = calculateAverage(words);
    let palindromes = findPalindromes(uniqueWords);
    let longestWords = findLongest(uniqueWords);
    let mostFrequentWords = frequency(words);
    return {
        nChars,
        nWords,
        nLines,
        nNonEmptyLines,
        averageWordLength,
        maxLineLength,
        palindromes,
        longestWords,
        mostFrequentWords
    };
}

function splitWords(text) {
    // Appending a blank space to the end of the text string.
    // This solves an issue where the last word does not pass the conditional statement below 
    // if the sentence does not end with a punctuation mark.
    // This took me 14 hours to figure out, I'm embarrassed.
    text += " ";
                                            
    let word = "";
    let wordArray = [];
    const letters = /[a-z0-9]/;                // Catch-all regex.  Only need a-z due to toLowerCase();
    for(letter in text) {
        let currentLetter = text.charAt(letter);
        if(currentLetter.match(letters)) {
            word += currentLetter;
        }
        else if (word != ""){
            wordArray.push(word);
            word = "";
        }
    }
    return wordArray;
}

function calculateAverage(allWords) {
    let totalWordLength = 0;
    for(let i = 0; i < allWords.length; i++) {
        totalWordLength += allWords[i].length;
    }
    return totalWordLength / allWords.length;
}

function findPalindromes(allWords) {
    let palindromes = [];
    for (word in allWords) {
    // Source for the next line:
    // https://medium.freecodecamp.org/how-to-reverse-a-string-in-javascript-in-3-different-ways-75e4763c68cb
        let reverse = allWords[word].split("").reverse().join("");
        if(reverse === allWords[word] && reverse.length > 2) {
            palindromes.push(allWords[word]);
        }
    }
    return palindromes;
}

// Apparently the JavaScript sort() method is put together using black magic.
// I am not worthy in its presence.  This is pure voodoo ahead.
// Sources:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare
function findLongest(allWords) {
    return allWords.sort((first, second) => second.length - first.length || first.localeCompare(second)).slice(0, 10);
}

// This function is mostly inspired from:
// https://stackoverflow.com/questions/5667888/counting-the-occurrences-frequency-of-array-elements
function frequency(allWords) {
    let freq = [];
    let returnThis = [];
    let freqCount = {};

    for (let i = 0; i < allWords.length; i++) {
        let word = allWords[i];
        freqCount[word] = freqCount[word] ? freqCount[word] + 1 : 1;
    }

    for(key in freqCount) {
        freq.push([key, freqCount[key]]);
    }

    freq.sort((first, second) => second[1] - first[1]);
    freq.sort((first, second) => first[0].localeCompare(second[0]));

    freq.slice(0, 10);
    
    for(i in freq) {
        returnThis[i] = freq[i][0] + "(" + freq[i][1] + ")";
    }

    return returnThis;
}