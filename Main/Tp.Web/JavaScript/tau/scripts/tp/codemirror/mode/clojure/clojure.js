define(["tp/codemirror/lib/codemirror"],function(e){e.defineMode("clojure",function(){function e(e){for(var t={},n=e.split(" "),r=0;r<n.length;++r)t[n[r]]=!0;return t}function t(e,t,n){this.indent=e,this.type=t,this.prev=n}function n(e,n,r){e.indentStack=new t(n,r,e.indentStack)}function r(e){e.indentStack=e.indentStack.prev}function a(e,t){return"0"===e&&"x"==t.peek().toLowerCase()?(t.eat("x"),t.eatWhile(y.hex),!0):(("+"==e||"-"==e)&&(t.eat(y.sign),e=t.next()),y.digit.test(e)?(t.eat(e),t.eatWhile(y.digit),"."==t.peek()&&(t.eat("."),t.eatWhile(y.digit)),"e"==t.peek().toLowerCase()&&(t.eat(y.exponent),t.eat(y.sign),t.eatWhile(y.digit)),!0):!1)}var s="builtin",o="comment",i="string",d="tag",l="atom",c="number",p="bracket",f=2,u=e("true false nil"),m=e("defn defn- def def- defonce defmulti defmethod defmacro defstruct deftype defprotocol defrecord deftest slice defalias defhinted defmacro- defn-memo defnk defnk defonce- defunbound defunbound- defvar defvar- let letfn do case cond condp for loop recur when when-not when-let when-first if if-let if-not . .. -> ->> doto and or dosync doseq dotimes dorun doall load import unimport ns in-ns refer try catch finally throw with-open with-local-vars binding gen-class gen-and-load-class gen-and-save-class handler-case handle* *1 *2 *3 *agent* *allow-unresolved-vars* *assert *clojure-version* *command-line-args* *compile-files* *compile-path* *e *err* *file* *flush-on-newline* *in* *macro-meta* *math-context* *ns* *out* *print-dup* *print-length* *print-level* *print-meta* *print-readably* *read-eval* *source-path* *use-context-classloader* *warn-on-reflection* + - / < <= = == > >= accessor aclone agent agent-errors aget alength alias all-ns alter alter-meta! alter-var-root amap ancestors and apply areduce array-map aset aset-boolean aset-byte aset-char aset-double aset-float aset-int aset-long aset-short assert assoc assoc! assoc-in associative? atom await await-for await1 bases bean bigdec bigint binding bit-and bit-and-not bit-clear bit-flip bit-not bit-or bit-set bit-shift-left bit-shift-right bit-test bit-xor boolean boolean-array booleans bound-fn bound-fn* butlast byte byte-array bytes case cast char char-array char-escape-string char-name-string char? chars chunk chunk-append chunk-buffer chunk-cons chunk-first chunk-next chunk-rest chunked-seq? class class? clear-agent-errors clojure-version coll? comment commute comp comparator compare compare-and-set! compile complement concat cond condp conj conj! cons constantly construct-proxy contains? count counted? create-ns create-struct cycle dec decimal? declare definline defmacro defmethod defmulti defn defn- defonce defstruct delay delay? deliver deref derive descendants destructure disj disj! dissoc dissoc! distinct distinct? doall doc dorun doseq dosync dotimes doto double double-array doubles drop drop-last drop-while empty empty? ensure enumeration-seq eval even? every? extend extend-protocol extend-type extends? extenders false? ffirst file-seq filter find find-doc find-ns find-var first float float-array float? floats flush fn fn? fnext for force format future future-call future-cancel future-cancelled? future-done? future? gen-class gen-interface gensym get get-in get-method get-proxy-class get-thread-bindings get-validator hash hash-map hash-set identical? identity if-let if-not ifn? import in-ns inc init-proxy instance? int int-array integer? interleave intern interpose into into-array ints io! isa? iterate iterator-seq juxt key keys keyword keyword? last lazy-cat lazy-seq let letfn line-seq list list* list? load load-file load-reader load-string loaded-libs locking long long-array longs loop macroexpand macroexpand-1 make-array make-hierarchy map map? mapcat max max-key memfn memoize merge merge-with meta method-sig methods min min-key mod name namespace neg? newline next nfirst nil? nnext not not-any? not-empty not-every? not= ns ns-aliases ns-imports ns-interns ns-map ns-name ns-publics ns-refers ns-resolve ns-unalias ns-unmap nth nthnext num number? odd? or parents partial partition pcalls peek persistent! pmap pop pop! pop-thread-bindings pos? pr pr-str prefer-method prefers primitives-classnames print print-ctor print-doc print-dup print-method print-namespace-doc print-simple print-special-doc print-str printf println println-str prn prn-str promise proxy proxy-call-with-super proxy-mappings proxy-name proxy-super push-thread-bindings pvalues quot rand rand-int range ratio? rational? rationalize re-find re-groups re-matcher re-matches re-pattern re-seq read read-line read-string reify reduce ref ref-history-count ref-max-history ref-min-history ref-set refer refer-clojure release-pending-sends rem remove remove-method remove-ns repeat repeatedly replace replicate require reset! reset-meta! resolve rest resultset-seq reverse reversible? rseq rsubseq satisfies? second select-keys send send-off seq seq? seque sequence sequential? set set-validator! set? short short-array shorts shutdown-agents slurp some sort sort-by sorted-map sorted-map-by sorted-set sorted-set-by sorted? special-form-anchor special-symbol? split-at split-with str stream? string? struct struct-map subs subseq subvec supers swap! symbol symbol? sync syntax-symbol-anchor take take-last take-nth take-while test the-ns time to-array to-array-2d trampoline transient tree-seq true? type unchecked-add unchecked-dec unchecked-divide unchecked-inc unchecked-multiply unchecked-negate unchecked-remainder unchecked-subtract underive unquote unquote-splicing update-in update-proxy use val vals var-get var-set var? vary-meta vec vector vector? when when-first when-let when-not while with-bindings with-bindings* with-in-str with-loading-context with-local-vars with-meta with-open with-out-str with-precision xml-seq"),h=e("ns fn def defn defmethod bound-fn if if-not case condp when while when-not when-first do future comment doto locking proxy with-open with-precision reify deftype defrecord defprotocol extend extend-protocol extend-type try catchlet letfn binding loop for doseq dotimes when-let if-letdefstruct struct-map assoctesting deftesthandler-case handle dotrace deftrace"),y={digit:/\d/,digit_or_colon:/[\d:]/,hex:/[0-9a-fA-F]/,sign:/[+-]/,exponent:/[eE]/,keyword_char:/[^\s\(\[\;\)\]]/,basic:/[\w\$_\-]/,lang_keyword:/[\w*+!\-_?:\/]/};
return{startState:function(){return{indentStack:null,indentation:0,mode:!1}},token:function(e,t){if(null==t.indentStack&&e.sol()&&(t.indentation=e.indentation()),e.eatSpace())return null;var g=null;switch(t.mode){case"string":for(var b,k=!1;null!=(b=e.next());){if('"'==b&&!k){t.mode=!1;break}k=!k&&"\\"==b}g=i;break;default:var w=e.next();if('"'==w)t.mode="string",g=i;else if("'"!=w||y.digit_or_colon.test(e.peek()))if(";"==w)e.skipToEnd(),g=o;else if(a(w,e))g=c;else if("("==w||"["==w){for(var v="",x=e.column();null!=(letter=e.eat(y.keyword_char));)v+=letter;v.length>0&&h.propertyIsEnumerable(v)?n(t,x+f,w):(e.eatSpace(),e.eol()||";"==e.peek()?n(t,x+1,w):n(t,x+e.current().length,w)),e.backUp(e.current().length-1),g=p}else if(")"==w||"]"==w)g=p,null!=t.indentStack&&t.indentStack.type==(")"==w?"(":"[")&&r(t);else{if(":"==w)return e.eatWhile(y.lang_keyword),d;e.eatWhile(y.basic),g=m&&m.propertyIsEnumerable(e.current())?s:u&&u.propertyIsEnumerable(e.current())?l:null}else g=l}return g},indent:function(e){return null==e.indentStack?e.indentation:e.indentStack.indent}}}),e.defineMIME("text/x-clojure","clojure")});