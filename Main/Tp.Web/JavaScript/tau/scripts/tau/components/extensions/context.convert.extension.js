define(["Underscore","tau/components/extensions/component.extension.base","tau/configurations/converters/converter.context"],function(a,b,c){return b.extend({init:function(a){this._super(a),this.practices=[],this.editions=[]},"bus onConfigContainerCreated":function(b){var d=[],e=[];if(b.data.context){var f=b.data.context,g=this;a.each(f.getPractices(),function(a){d.push(a.name)}),e=f.getEdition()?[f.getEdition()]:[]}var h=b.data;c.convert(h,d,e)}})})