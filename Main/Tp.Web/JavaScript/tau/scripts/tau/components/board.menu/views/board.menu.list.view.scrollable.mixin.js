define(["require","jQuery"],function(e){var o=e("jQuery");return{componentDidMount:function(){o("body").on("mousewheel.viewsMenuScrollable",".tau-sp-collapsed .t3-views-navigator .t3-views-catalog",function(e){this.scrollTop-=e.deltaY*e.deltaFactor})},componentWillUnmount:function(){o("body").off(".viewsMenuScrollable")}}});