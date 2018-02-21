$(function() {
    //Checks if it's a Canadian page.
    if(window.location.href.indexOf('.ca') > -1) {

      //Create an array to gather all text nodes, set up variables for the results log
      var textNodesList = [];
      var count = 0;
      var replaced = '';

      //Filter all text nodes in body
      var textNodes = $('body, body *:not(script)').contents().filter(function() {
        return this.nodeType === Node.TEXT_NODE;
      });

      //For each text node found
      textNodes.each(function () {

        //Add this node to the text nodes array
        textNodesList.push(this);
        var thisNode = this.nodeValue;

        //List of words to replace
        var wordList = {
          'behavior':'behaviour',
          'center':'centre',
          'color':'colour',
          'favorite':'favourite',
          'fiber':'fibre',
          'flavor':'flavour',
          'gray':'grey',
          'liter':'litre',
          'meter':'metre',
          'neighbor':'neighbour',
          'parlor':'parlour',
          'pajamas':'pyjamas',
          'odor':'odour',
          'savor':'savour'
        }

        //For each word in the list
        $.each(wordList, function(key, value){

          //Create Regex string for singular and plural version of the word
          var regexString = '\\b' + key + '\\b';
          var regex = new RegExp(regexString, 'gi');
          var regexStringPlural = '\\b' + key + 's\\b';
          var regexPlural = new RegExp(regexStringPlural, 'gi');

          //Get a list of matches for each word
          var match = regex.exec(regex);
          var matchPlural = regexPlural.exec(regexPlural);
          var valuePlural = value + 's';

          //For each match that isn't "null"
          while ((match = regex.exec(thisNode)) != null) {

             //Convert first letter to uppercase if original value had uppercase
             if (match[0] == match[0].toUpperCase()) {
               value = value.toUpperCase();
             }

             //Convert whole word to uppercase if original word was uppercase
             if (match[0].charAt(0) == match[0].charAt(0).toUpperCase()) {
               value = value.charAt(0).toUpperCase() + value.substring(1);
             }

             //Update log to keep track of words that were replaced
             replaced += '\"' + match[0] + '\" was replaced by \"' + value + '\".\n';

          }

          //For each match that isn't "null"
          while ((matchPlural = regexPlural.exec(thisNode)) != null) {
            //Add an 's' to the word if the original word was plural
            //Convert first letter to uppercase if original value had uppercase
             if (matchPlural[0] == matchPlural[0].toUpperCase()) {
               valuePlural = valuePlural.toUpperCase();
             }

             //Convert whole word to uppercase if original word was uppercase
             if (matchPlural[0].charAt(0) == matchPlural[0].charAt(0).toUpperCase()) {
               valuePlural = valuePlural.charAt(0).toUpperCase() + valuePlural.substring(1);
             }

             //Update log to keep track of words that were replaced
             replaced += '\"' + matchPlural[0] + '\" was replaced by \"' + valuePlural + '\".\n';
          }

          //Replace the regex of wordList key with wordList value if there is a word to replace
          if (thisNode != thisNode.replace(regex, value)) {
            thisNode = thisNode.replace(regex, value);
            count++;
          }

          if (thisNode != thisNode.replace(regexPlural, valuePlural)) {
            thisNode = thisNode.replace(regexPlural, valuePlural);
            count++;
          }

        });

        //Redefine this node's value to the value created in the each statement
        this.nodeValue = thisNode;

      });

        console.groupCollapsed('Canada spellcheck:');
      //Log the spell check results
      if (count > 0) {
        console.log(count + ' words were replaced:\n' + replaced);
      } else {
        console.log('No words were replaced.')
      }
        console.groupEnd();
    }

});
