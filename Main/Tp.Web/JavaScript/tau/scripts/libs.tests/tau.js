var tau=tau||{};tau.makeSame=function(a,b){var ac=_.extend({},a);return _.each(_.keys(a),function(key){b.hasOwnProperty(key)||delete ac[key]}),ac}