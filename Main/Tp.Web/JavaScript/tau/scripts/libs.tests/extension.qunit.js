define(["Underscore"],function(_){var makeSame=function(a,b){var ac=_.extend({},a);return _.each(_.keys(a),function(key){b.hasOwnProperty(key)||delete ac[key]}),ac};window.included=QUnit.included=function(actual,expected,message){var same=makeSame(_.extend({},actual),expected),isEquiv=QUnit.equiv(same,expected);QUnit.push(isEquiv,same,expected,message)}})