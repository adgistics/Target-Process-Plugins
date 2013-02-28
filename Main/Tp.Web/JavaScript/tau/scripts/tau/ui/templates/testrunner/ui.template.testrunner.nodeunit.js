define(["tau/core/templates-factory"],function(templates){var config={name:"testrunner.nodeunit",markup:["<div>",'<h1 id="nodeunit-header">','<form method="GET">','<a href="?">Tau Tests Suite</a>&nbsp;&nbsp;',"<fieldset><legend>General</legend>",'<label><input type="checkbox" name="shuffle" {{if options.shuffle}}checked{{/if}}>shuffle</label>','<label><input type="radio" name="execution" value="serial"   {{if options.execution == "serial"}}checked{{/if}}>serial execution</label>','<label><input type="radio" name="execution" value="parallel" {{if options.execution == "parallel"}}checked{{/if}}>parallel execution</label>',"</fieldset>","<fieldset><legend>Data</legend>",'<label><input type="radio" name="data" value="local" {{if options.data == "local"}}checked{{/if}}>local</label>','<label><input type="radio" name="data" value="remote" {{if options.data == "remote"}}checked{{/if}}>remote</label>',"</fieldset>",'<div class="nodeunit-form__buttons">','<input type="submit" name="apply" value="apply" />','<input type="submit" name="reset" value="reset to defaults" />',"{{if options.filter || options.file}}",'<input type="submit" name="reset_filters" value="reset filters" />',"{{/if}}","</div>",'<input type="hidden" name="filter" value="${options.filter}" />','<input type="hidden" name="file" value="${options.file}" />',"</form>","</h1>",'<h2 id="nodeunit-banner" class="nodeunit-pending"></h2>','<h2 id="nodeunit-userAgent">${useragent}</h2>','<p id="nodeunit-testresult" class="result" role="result-total">','Tests completed in <span role="time">&infin;</span> milliseconds.<br/>','<span class="passed" role="passed">&infin;</span> assertions of ','<span class="all" role="all">&infin;</span> passed,','<span class="failed" role="failed">&infin;</span> failed.',"</p>",'<ol id="nodeunit-tests">',"{{each modules}}",'<li class="nodeunit-pending" role="module" id="${$value.id}">','<strong class="nodeunit-module-name">${$value.name}</strong> ',"<i>${$value.file}</i>",'<a href="?file=${$value.file}">File</a>','<a href="?filter=${$value.name}">Rerun</a>','<div class="nodeunit-module-result" role="result">','Tests completed in <span role="time">&infin;</span> milliseconds.<br/>','<span class="passed" role="passed">&infin;</span> assertions of ','<span class="all" role="all">&infin;</span> passed,','<span class="failed" role="failed">&infin;</span> failed.',"</div>",'<ol class="nodeunit-tests" role="tests"></ol>',"</li>","{{/each}}","</ol>","</div>"]};return templates.register(config)})