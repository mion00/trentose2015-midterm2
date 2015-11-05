/* your code should go in this file */

/* 
 * The data is available in the array *data*
 * Each element of the array has the following structure:
 *  {
 *    word_en : "Apple",  // word in english
 *    word_de : "Apfel"   // word in german
 *  }
 */
'use strict';

var tmpl = ' <li id="ID">' +
    '  <h3>WORD</h3>' +
    '  <h3 class="solution">SOLUTION</h3>' +
    ' </li> ';

var languageSelector = {
    foreignLanguage: 'de',
    currentLanguage: 'en',
    insertWords: function (elem, words) {
        elem.children("h3").first().html(words['word_' + languageSelector.currentLanguage]);
        elem.children("h3").last().html(words['word_' + languageSelector.foreignLanguage]);
    }
};

var options = {
    init: function () {
        options.options = $(".options");
        options.hideOptions();
        options.options.find(".btn.opt-incorrect").click(options.correctHandler);
        options.options.find(".btn.opt-correct").click(options.incorrectHandler);
    },
    correctHandler: function() {
        translation.guessedWord += 1;
        translation.showNextWord();
    },
    incorrectHandler: function() {
        translation.showNextWord();
    },
    hideOptions: function() {
        options.options.hide();
    },
    showOptions: function() {
        options.options.show();
    }
};

var final = {
    init: function() {
        $(".final").hide();
    },
    end: function() {
        $(".final").find("#tot-good").html(translation.guessedWord);
        $(".final").find("#tot").html(translation.numberWords);
        $(".final").show();
    }
};

var translation = {
    numberWords: data.length,
    guessedWord: 0,
    nextWords: 0,
    init: function () {
        translation.loadWords();
        translation.showNextWord();
        options.init();
        final.init();
        $(".final").hide();
    },
    loadWords: function () {
        data.forEach(function (words, index) {
            var word = $(tmpl).clone();
            word.attr("id", index);
            languageSelector.insertWords(word, words);
            word.click(translation.handler);
            word.appendTo(".cards");
        })
    },
    showNextWord: function () {
        if (translation.nextWords > 0) {
            var oldWords = $(".cards>li#" + (translation.nextWords-1));
            oldWords.hide();
        }
        if (translation.nextWords == translation.numberWords) {
            translation.end();
            return;
        }
        var words = $(".cards>li#" + translation.nextWords);
        words.addClass("current");
        words.children(".solution").hide();
        translation.nextWords++;
    },
    handler: function (event) {
        var words = $(this);
        words.children("h3").first().hide();
        words.children(".solution").show();
        options.showOptions();
    },
    end: function () {
        options.hideOptions();
        final.end();
    }
};

$(document).ready(function () {
    translation.init();
});





