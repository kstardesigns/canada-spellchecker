# canada-spellchecker
A script that replaces instances of chosen words with Canadian spellings of that word. Update the `wordList` object to specify which words should be replaced and what they should be replaced with.

The replaced word keeps its original case (UPPER, lower, Capitalized), and logs the results of how many and what words were replaced. Only replaces exact word and its plural. If it has a prefix, suffix, misspelling, or is found inside of a longer word, etc. it will not be replaced (this is done by choice).
