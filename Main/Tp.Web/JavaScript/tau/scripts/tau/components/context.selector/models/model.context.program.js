define(["Underscore","jQuery","tau/core/class"],function(e,r,t){var i=t.extend({init:function(e){this._store=e},getAvailableProjects:function(e){var t=r.Deferred();return this._store.find("project",{$query:{program:{$isNull:!0},isActive:"true"},fields:e}).done(function(e){t.resolve(e[0].data)}),t.promise()}});return i});