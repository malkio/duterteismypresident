/*!
 * jQuery JavaScript Library v2.2.2
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2016-03-17T17:51Z
 */

(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Support: Firefox 18+
// Can't be in strict mode, several libs including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
//"use strict";
var arr = [];

var document = window.document;

var slice = arr.slice;

var concat = arr.concat;

var push = arr.push;

var indexOf = arr.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	version = "2.2.2",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {

	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	each: function( callback ) {
		return jQuery.each( this, callback );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map( this, function( elem, i ) {
			return callback.call( elem, i, elem );
		} ) );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor();
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: arr.sort,
	splice: arr.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// Skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction( target ) ) {
		target = {};
	}

	// Extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = jQuery.isArray( copy ) ) ) ) {

					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray( src ) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject( src ) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend( {

	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	isFunction: function( obj ) {
		return jQuery.type( obj ) === "function";
	},

	isArray: Array.isArray,

	isWindow: function( obj ) {
		return obj != null && obj === obj.window;
	},

	isNumeric: function( obj ) {

		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		// adding 1 corrects loss of precision from parseFloat (#15100)
		var realStringObj = obj && obj.toString();
		return !jQuery.isArray( obj ) && ( realStringObj - parseFloat( realStringObj ) + 1 ) >= 0;
	},

	isPlainObject: function( obj ) {
		var key;

		// Not plain objects:
		// - Any object or value whose internal [[Class]] property is not "[object Object]"
		// - DOM nodes
		// - window
		if ( jQuery.type( obj ) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		// Not own constructor property must be Object
		if ( obj.constructor &&
				!hasOwn.call( obj, "constructor" ) &&
				!hasOwn.call( obj.constructor.prototype || {}, "isPrototypeOf" ) ) {
			return false;
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own
		for ( key in obj ) {}

		return key === undefined || hasOwn.call( obj, key );
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}

		// Support: Android<4.0, iOS<6 (functionish RegExp)
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call( obj ) ] || "object" :
			typeof obj;
	},

	// Evaluates a script in a global context
	globalEval: function( code ) {
		var script,
			indirect = eval;

		code = jQuery.trim( code );

		if ( code ) {

			// If the code includes a valid, prologue position
			// strict mode pragma, execute code by injecting a
			// script tag into the document.
			if ( code.indexOf( "use strict" ) === 1 ) {
				script = document.createElement( "script" );
				script.text = code;
				document.head.appendChild( script ).parentNode.removeChild( script );
			} else {

				// Otherwise, avoid the DOM node creation, insertion
				// and removal by using an indirect global eval

				indirect( code );
			}
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Support: IE9-11+
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	each: function( obj, callback ) {
		var length, i = 0;

		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
	},

	// Support: Android<4.1
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArrayLike( Object( arr ) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		return arr == null ? -1 : indexOf.call( arr, elem, i );
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		for ( ; j < len; j++ ) {
			first[ i++ ] = second[ j ];
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var length, value,
			i = 0,
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArrayLike( elems ) ) {
			length = elems.length;
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var tmp, args, proxy;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: Date.now,

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
} );

// JSHint would error on this code due to the Symbol not being defined in ES5.
// Defining this global in .jshintrc would create a danger of using the global
// unguarded in another place, it seems safer to just disable JSHint for these
// three lines.
/* jshint ignore: start */
if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = arr[ Symbol.iterator ];
}
/* jshint ignore: end */

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
function( i, name ) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
} );

function isArrayLike( obj ) {

	// Support: iOS 8.2 (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.2.1
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2015-10-17
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// http://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",

	// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + identifier + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + identifier + ")" ),
		"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
		"TAG": new RegExp( "^(" + identifier + "|[*])" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var m, i, elem, nid, nidselect, match, groups, newSelector,
		newContext = context && context.ownerDocument,

		// nodeType defaults to 9, since context defaults to document
		nodeType = context ? context.nodeType : 9;

	results = results || [];

	// Return early from calls with invalid selector or context
	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	// Try to shortcut find operations (as opposed to filters) in HTML documents
	if ( !seed ) {

		if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
			setDocument( context );
		}
		context = context || document;

		if ( documentIsHTML ) {

			// If the selector is sufficiently simple, try using a "get*By*" DOM method
			// (excepting DocumentFragment context, where the methods don't exist)
			if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {

				// ID selector
				if ( (m = match[1]) ) {

					// Document context
					if ( nodeType === 9 ) {
						if ( (elem = context.getElementById( m )) ) {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( elem.id === m ) {
								results.push( elem );
								return results;
							}
						} else {
							return results;
						}

					// Element context
					} else {

						// Support: IE, Opera, Webkit
						// TODO: identify versions
						// getElementById can match elements by name instead of ID
						if ( newContext && (elem = newContext.getElementById( m )) &&
							contains( context, elem ) &&
							elem.id === m ) {

							results.push( elem );
							return results;
						}
					}

				// Type selector
				} else if ( match[2] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Class selector
				} else if ( (m = match[3]) && support.getElementsByClassName &&
					context.getElementsByClassName ) {

					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// Take advantage of querySelectorAll
			if ( support.qsa &&
				!compilerCache[ selector + " " ] &&
				(!rbuggyQSA || !rbuggyQSA.test( selector )) ) {

				if ( nodeType !== 1 ) {
					newContext = context;
					newSelector = selector;

				// qSA looks outside Element context, which is not what we want
				// Thanks to Andrew Dupont for this workaround technique
				// Support: IE <=8
				// Exclude object elements
				} else if ( context.nodeName.toLowerCase() !== "object" ) {

					// Capture the context ID, setting it first if necessary
					if ( (nid = context.getAttribute( "id" )) ) {
						nid = nid.replace( rescape, "\\$&" );
					} else {
						context.setAttribute( "id", (nid = expando) );
					}

					// Prefix every selector in the list
					groups = tokenize( selector );
					i = groups.length;
					nidselect = ridentifier.test( nid ) ? "#" + nid : "[id='" + nid + "']";
					while ( i-- ) {
						groups[i] = nidselect + " " + toSelector( groups[i] );
					}
					newSelector = groups.join( "," );

					// Expand context for sibling selectors
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
						context;
				}

				if ( newSelector ) {
					try {
						push.apply( results,
							newContext.querySelectorAll( newSelector )
						);
						return results;
					} catch ( qsaError ) {
					} finally {
						if ( nid === expando ) {
							context.removeAttribute( "id" );
						}
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = arr.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, parent,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// Return early if doc is invalid or already selected
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Update global variables
	document = doc;
	docElem = document.documentElement;
	documentIsHTML = !isXML( document );

	// Support: IE 9-11, Edge
	// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
	if ( (parent = document.defaultView) && parent.top !== parent ) {
		// Support: IE 11
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", unloadHandler, false );

		// Support: IE 9 - 10 only
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( document.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( document.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !document.getElementsByName || !document.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var m = context.getElementById( id );
				return m ? [ m ] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" &&
					elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			docElem.appendChild( div ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\r\\' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
			if ( !div.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibing-combinator selector` fails
			if ( !div.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = document.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully self-exclusive
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === document ? -1 :
				b === document ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return document;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		!compilerCache[ expr + " " ] &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, uniqueCache, outerCache, node, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType,
						diff = false;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) {

										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {

							// Seek `elem` from a previously-cached index

							// ...in a gzip-friendly way
							node = parent;
							outerCache = node[ expando ] || (node[ expando ] = {});

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ node.uniqueID ] ||
								(outerCache[ node.uniqueID ] = {});

							cache = uniqueCache[ type ] || [];
							nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
							diff = nodeIndex && cache[ 2 ];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						} else {
							// Use previously-cached element index if available
							if ( useCache ) {
								// ...in a gzip-friendly way
								node = elem;
								outerCache = node[ expando ] || (node[ expando ] = {});

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									(outerCache[ node.uniqueID ] = {});

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex;
							}

							// xml :nth-child(...)
							// or :nth-last-child(...) or :nth(-last)?-of-type(...)
							if ( diff === false ) {
								// Use the same loop as above to seek `elem` from the start
								while ( (node = ++nodeIndex && node && node[ dir ] ||
									(diff = nodeIndex = 0) || start.pop()) ) {

									if ( ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) &&
										++diff ) {

										// Cache the index of each encountered element
										if ( useCache ) {
											outerCache = node[ expando ] || (node[ expando ] = {});

											// Support: IE <9 only
											// Defend against cloned attroperties (jQuery gh-1709)
											uniqueCache = outerCache[ node.uniqueID ] ||
												(outerCache[ node.uniqueID ] = {});

											uniqueCache[ type ] = [ dirruns, diff ];
										}

										if ( node === elem ) {
											break;
										}
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, uniqueCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});

						// Support: IE <9 only
						// Defend against cloned attroperties (jQuery gh-1709)
						uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});

						if ( (oldCache = uniqueCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							uniqueCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context === document || context || outermost;
			}

			// Add elements passing elementMatchers directly to results
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					if ( !context && elem.ownerDocument !== document ) {
						setDocument( elem );
						xml = !documentIsHTML;
					}
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context || document, xml) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// `i` is now the count of elements visited above, and adding it to `matchedCount`
			// makes the latter nonnegative.
			matchedCount += i;

			// Apply set filters to unmatched elements
			// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
			// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
			// no element matchers and no seed.
			// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
			// case, which will result in a "00" `matchedCount` that differs from `i` but is also
			// numerically zero.
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is only one selector in the list and no seed
	// (the latter of which guarantees us context)
	if ( match.length === 1 ) {

		// Reduce context if the leading compound selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[ ":" ] = jQuery.expr.pseudos;
jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var dir = function( elem, dir, until ) {
	var matched = [],
		truncate = until !== undefined;

	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
		if ( elem.nodeType === 1 ) {
			if ( truncate && jQuery( elem ).is( until ) ) {
				break;
			}
			matched.push( elem );
		}
	}
	return matched;
};


var siblings = function( n, elem ) {
	var matched = [];

	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType === 1 && n !== elem ) {
			matched.push( n );
		}
	}

	return matched;
};


var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = ( /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/ );



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		} );

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		} );

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( indexOf.call( qualifier, elem ) > -1 ) !== not;
	} );
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		} ) );
};

jQuery.fn.extend( {
	find: function( selector ) {
		var i,
			len = this.length,
			ret = [],
			self = this;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter( function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			} ) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow( this, selector || [], false ) );
	},
	not: function( selector ) {
		return this.pushStack( winnow( this, selector || [], true ) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
} );


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Method init() accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector[ 0 ] === "<" &&
				selector[ selector.length - 1 ] === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;

					// Option to run scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[ 2 ] );

					// Support: Blackberry 4.6
					// gEBID returns nodes no longer in the document (#6963)
					if ( elem && elem.parentNode ) {

						// Inject the element directly into the jQuery object
						this.length = 1;
						this[ 0 ] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return root.ready !== undefined ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,

	// Methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend( {
	has: function( target ) {
		var targets = jQuery( target, this ),
			l = targets.length;

		return this.filter( function() {
			var i = 0;
			for ( ; i < l; i++ ) {
				if ( jQuery.contains( this, targets[ i ] ) ) {
					return true;
				}
			}
		} );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

				// Always skip document fragments
				if ( cur.nodeType < 11 && ( pos ?
					pos.index( cur ) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector( cur, selectors ) ) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},

	// Determine the position of an element within the set
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// Index in selector
		if ( typeof elem === "string" ) {
			return indexOf.call( jQuery( elem ), this[ 0 ] );
		}

		// Locate the position of the desired element
		return indexOf.call( this,

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem
		);
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.uniqueSort(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}
} );

function sibling( cur, dir ) {
	while ( ( cur = cur[ dir ] ) && cur.nodeType !== 1 ) {}
	return cur;
}

jQuery.each( {
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return siblings( elem.firstChild );
	},
	contents: function( elem ) {
		return elem.contentDocument || jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var matched = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			matched = jQuery.filter( selector, matched );
		}

		if ( this.length > 1 ) {

			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				jQuery.uniqueSort( matched );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				matched.reverse();
			}
		}

		return this.pushStack( matched );
	};
} );
var rnotwhite = ( /\S+/g );



// Convert String-formatted options into Object-formatted ones
function createOptions( options ) {
	var object = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	} );
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		createOptions( options ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,

		// Last fire value for non-forgettable lists
		memory,

		// Flag to know if list was already fired
		fired,

		// Flag to prevent firing
		locked,

		// Actual callback list
		list = [],

		// Queue of execution data for repeatable lists
		queue = [],

		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,

		// Fire callbacks
		fire = function() {

			// Enforce single-firing
			locked = options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			fired = firing = true;
			for ( ; queue.length; firingIndex = -1 ) {
				memory = queue.shift();
				while ( ++firingIndex < list.length ) {

					// Run callback and check for early termination
					if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
						options.stopOnFalse ) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if ( !options.memory ) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if ( locked ) {

				// Keep an empty list if we have data for future add calls
				if ( memory ) {
					list = [];

				// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},

		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {

					// If we have memory from a past run, we should fire after adding
					if ( memory && !firing ) {
						firingIndex = list.length - 1;
						queue.push( memory );
					}

					( function add( args ) {
						jQuery.each( args, function( _, arg ) {
							if ( jQuery.isFunction( arg ) ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && jQuery.type( arg ) !== "string" ) {

								// Inspect recursively
								add( arg );
							}
						} );
					} )( arguments );

					if ( memory && !firing ) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function() {
				jQuery.each( arguments, function( _, arg ) {
					var index;
					while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
						list.splice( index, 1 );

						// Handle firing indexes
						if ( index <= firingIndex ) {
							firingIndex--;
						}
					}
				} );
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ?
					jQuery.inArray( fn, list ) > -1 :
					list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function() {
				if ( list ) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function() {
				locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function() {
				locked = queue = [];
				if ( !memory ) {
					list = memory = "";
				}
				return this;
			},
			locked: function() {
				return !!locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( !locked ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					queue.push( args );
					if ( !firing ) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend( {

	Deferred: function( func ) {
		var tuples = [

				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks( "once memory" ), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks( "once memory" ), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks( "memory" ) ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred( function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];

							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[ 1 ] ]( function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.progress( newDefer.notify )
										.done( newDefer.resolve )
										.fail( newDefer.reject );
								} else {
									newDefer[ tuple[ 0 ] + "With" ](
										this === promise ? newDefer.promise() : this,
										fn ? [ returned ] : arguments
									);
								}
							} );
						} );
						fns = null;
					} ).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[ 1 ] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add( function() {

					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[ 0 ] ] = function() {
				deferred[ tuple[ 0 ] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
		} );

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 ||
				( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred.
			// If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );
					} else if ( !( --remaining ) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// Add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.progress( updateFunc( i, progressContexts, progressValues ) )
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject );
				} else {
					--remaining;
				}
			}
		}

		// If we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
} );


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {

	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend( {

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.triggerHandler ) {
			jQuery( document ).triggerHandler( "ready" );
			jQuery( document ).off( "ready" );
		}
	}
} );

/**
 * The ready event handler and self cleanup method
 */
function completed() {
	document.removeEventListener( "DOMContentLoaded", completed );
	window.removeEventListener( "load", completed );
	jQuery.ready();
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called
		// after the browser event has already occurred.
		// Support: IE9-10 only
		// Older IE sometimes signals "interactive" too soon
		if ( document.readyState === "complete" ||
			( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

			// Handle it asynchronously to allow scripts the opportunity to delay ready
			window.setTimeout( jQuery.ready );

		} else {

			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed );
		}
	}
	return readyList.promise( obj );
};

// Kick off the DOM ready check even if the user does not
jQuery.ready.promise();




// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		len = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {

			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < len; i++ ) {
				fn(
					elems[ i ], key, raw ?
					value :
					value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			len ? fn( elems[ 0 ], key ) : emptyGet;
};
var acceptData = function( owner ) {

	// Accepts only:
	//  - Node
	//    - Node.ELEMENT_NODE
	//    - Node.DOCUMENT_NODE
	//  - Object
	//    - Any
	/* jshint -W018 */
	return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
};




function Data() {
	this.expando = jQuery.expando + Data.uid++;
}

Data.uid = 1;

Data.prototype = {

	register: function( owner, initial ) {
		var value = initial || {};

		// If it is a node unlikely to be stringify-ed or looped over
		// use plain assignment
		if ( owner.nodeType ) {
			owner[ this.expando ] = value;

		// Otherwise secure it in a non-enumerable, non-writable property
		// configurability must be true to allow the property to be
		// deleted with the delete operator
		} else {
			Object.defineProperty( owner, this.expando, {
				value: value,
				writable: true,
				configurable: true
			} );
		}
		return owner[ this.expando ];
	},
	cache: function( owner ) {

		// We can accept data for non-element nodes in modern browsers,
		// but we should not, see #8335.
		// Always return an empty object.
		if ( !acceptData( owner ) ) {
			return {};
		}

		// Check if the owner object already has a cache
		var value = owner[ this.expando ];

		// If not, create one
		if ( !value ) {
			value = {};

			// We can accept data for non-element nodes in modern browsers,
			// but we should not, see #8335.
			// Always return an empty object.
			if ( acceptData( owner ) ) {

				// If it is a node unlikely to be stringify-ed or looped over
				// use plain assignment
				if ( owner.nodeType ) {
					owner[ this.expando ] = value;

				// Otherwise secure it in a non-enumerable property
				// configurable must be true to allow the property to be
				// deleted when data is removed
				} else {
					Object.defineProperty( owner, this.expando, {
						value: value,
						configurable: true
					} );
				}
			}
		}

		return value;
	},
	set: function( owner, data, value ) {
		var prop,
			cache = this.cache( owner );

		// Handle: [ owner, key, value ] args
		if ( typeof data === "string" ) {
			cache[ data ] = value;

		// Handle: [ owner, { properties } ] args
		} else {

			// Copy the properties one-by-one to the cache object
			for ( prop in data ) {
				cache[ prop ] = data[ prop ];
			}
		}
		return cache;
	},
	get: function( owner, key ) {
		return key === undefined ?
			this.cache( owner ) :
			owner[ this.expando ] && owner[ this.expando ][ key ];
	},
	access: function( owner, key, value ) {
		var stored;

		// In cases where either:
		//
		//   1. No key was specified
		//   2. A string key was specified, but no value provided
		//
		// Take the "read" path and allow the get method to determine
		// which value to return, respectively either:
		//
		//   1. The entire cache object
		//   2. The data stored at the key
		//
		if ( key === undefined ||
				( ( key && typeof key === "string" ) && value === undefined ) ) {

			stored = this.get( owner, key );

			return stored !== undefined ?
				stored : this.get( owner, jQuery.camelCase( key ) );
		}

		// When the key is not a string, or both a key and value
		// are specified, set or extend (existing objects) with either:
		//
		//   1. An object of properties
		//   2. A key and value
		//
		this.set( owner, key, value );

		// Since the "set" path can have two possible entry points
		// return the expected data based on which path was taken[*]
		return value !== undefined ? value : key;
	},
	remove: function( owner, key ) {
		var i, name, camel,
			cache = owner[ this.expando ];

		if ( cache === undefined ) {
			return;
		}

		if ( key === undefined ) {
			this.register( owner );

		} else {

			// Support array or space separated string of keys
			if ( jQuery.isArray( key ) ) {

				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = key.concat( key.map( jQuery.camelCase ) );
			} else {
				camel = jQuery.camelCase( key );

				// Try the string as a key before any manipulation
				if ( key in cache ) {
					name = [ key, camel ];
				} else {

					// If a key with the spaces exists, use it.
					// Otherwise, create an array by matching non-whitespace
					name = camel;
					name = name in cache ?
						[ name ] : ( name.match( rnotwhite ) || [] );
				}
			}

			i = name.length;

			while ( i-- ) {
				delete cache[ name[ i ] ];
			}
		}

		// Remove the expando if there's no more data
		if ( key === undefined || jQuery.isEmptyObject( cache ) ) {

			// Support: Chrome <= 35-45+
			// Webkit & Blink performance suffers when deleting properties
			// from DOM nodes, so set to undefined instead
			// https://code.google.com/p/chromium/issues/detail?id=378607
			if ( owner.nodeType ) {
				owner[ this.expando ] = undefined;
			} else {
				delete owner[ this.expando ];
			}
		}
	},
	hasData: function( owner ) {
		var cache = owner[ this.expando ];
		return cache !== undefined && !jQuery.isEmptyObject( cache );
	}
};
var dataPriv = new Data();

var dataUser = new Data();



//	Implementation Summary
//
//	1. Enforce API surface and semantic compatibility with 1.9.x branch
//	2. Improve the module's maintainability by reducing the storage
//		paths to a single mechanism.
//	3. Use the same single mechanism to support "private" and "user" data.
//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
//	5. Avoid exposing implementation details on user objects (eg. expando properties)
//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /[A-Z]/g;

function dataAttr( elem, key, data ) {
	var name;

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {
		name = "data-" + key.replace( rmultiDash, "-$&" ).toLowerCase();
		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :

					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch ( e ) {}

			// Make sure we set the data so it isn't changed later
			dataUser.set( elem, key, data );
		} else {
			data = undefined;
		}
	}
	return data;
}

jQuery.extend( {
	hasData: function( elem ) {
		return dataUser.hasData( elem ) || dataPriv.hasData( elem );
	},

	data: function( elem, name, data ) {
		return dataUser.access( elem, name, data );
	},

	removeData: function( elem, name ) {
		dataUser.remove( elem, name );
	},

	// TODO: Now that all calls to _data and _removeData have been replaced
	// with direct calls to dataPriv methods, these can be deprecated.
	_data: function( elem, name, data ) {
		return dataPriv.access( elem, name, data );
	},

	_removeData: function( elem, name ) {
		dataPriv.remove( elem, name );
	}
} );

jQuery.fn.extend( {
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = dataUser.get( elem );

				if ( elem.nodeType === 1 && !dataPriv.get( elem, "hasDataAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE11+
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice( 5 ) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					dataPriv.set( elem, "hasDataAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each( function() {
				dataUser.set( this, key );
			} );
		}

		return access( this, function( value ) {
			var data, camelKey;

			// The calling jQuery object (element matches) is not empty
			// (and therefore has an element appears at this[ 0 ]) and the
			// `value` parameter was not undefined. An empty jQuery object
			// will result in `undefined` for elem = this[ 0 ] which will
			// throw an exception if an attempt to read a data cache is made.
			if ( elem && value === undefined ) {

				// Attempt to get data from the cache
				// with the key as-is
				data = dataUser.get( elem, key ) ||

					// Try to find dashed key if it exists (gh-2779)
					// This is for 2.2.x only
					dataUser.get( elem, key.replace( rmultiDash, "-$&" ).toLowerCase() );

				if ( data !== undefined ) {
					return data;
				}

				camelKey = jQuery.camelCase( key );

				// Attempt to get data from the cache
				// with the key camelized
				data = dataUser.get( elem, camelKey );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to "discover" the data in
				// HTML5 custom data-* attrs
				data = dataAttr( elem, camelKey, undefined );
				if ( data !== undefined ) {
					return data;
				}

				// We tried really hard, but the data doesn't exist.
				return;
			}

			// Set the data...
			camelKey = jQuery.camelCase( key );
			this.each( function() {

				// First, attempt to store a copy or reference of any
				// data that might've been store with a camelCased key.
				var data = dataUser.get( this, camelKey );

				// For HTML5 data-* attribute interop, we have to
				// store property names with dashes in a camelCase form.
				// This might not apply to all properties...*
				dataUser.set( this, camelKey, value );

				// *... In the case of properties that might _actually_
				// have dashes, we need to also store a copy of that
				// unchanged property.
				if ( key.indexOf( "-" ) > -1 && data !== undefined ) {
					dataUser.set( this, key, value );
				}
			} );
		}, null, value, arguments.length > 1, null, true );
	},

	removeData: function( key ) {
		return this.each( function() {
			dataUser.remove( this, key );
		} );
	}
} );


jQuery.extend( {
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = dataPriv.get( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray( data ) ) {
					queue = dataPriv.access( elem, type, jQuery.makeArray( data ) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// Clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// Not public - generate a queueHooks object, or return the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return dataPriv.get( elem, key ) || dataPriv.access( elem, key, {
			empty: jQuery.Callbacks( "once memory" ).add( function() {
				dataPriv.remove( elem, [ type + "queue", key ] );
			} )
		} );
	}
} );

jQuery.fn.extend( {
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[ 0 ], type );
		}

		return data === undefined ?
			this :
			this.each( function() {
				var queue = jQuery.queue( this, type, data );

				// Ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			} );
	},
	dequeue: function( type ) {
		return this.each( function() {
			jQuery.dequeue( this, type );
		} );
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},

	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = dataPriv.get( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
} );
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {

		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" ||
			!jQuery.contains( elem.ownerDocument, elem );
	};



function adjustCSS( elem, prop, valueParts, tween ) {
	var adjusted,
		scale = 1,
		maxIterations = 20,
		currentValue = tween ?
			function() { return tween.cur(); } :
			function() { return jQuery.css( elem, prop, "" ); },
		initial = currentValue(),
		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

		// Starting value computation is required for potential unit mismatches
		initialInUnit = ( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
			rcssNum.exec( jQuery.css( elem, prop ) );

	if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

		// Trust units reported by jQuery.css
		unit = unit || initialInUnit[ 3 ];

		// Make sure we update the tween properties later on
		valueParts = valueParts || [];

		// Iteratively approximate from a nonzero starting point
		initialInUnit = +initial || 1;

		do {

			// If previous iteration zeroed out, double until we get *something*.
			// Use string for doubling so we don't accidentally see scale as unchanged below
			scale = scale || ".5";

			// Adjust and apply
			initialInUnit = initialInUnit / scale;
			jQuery.style( elem, prop, initialInUnit + unit );

		// Update scale, tolerating zero or NaN from tween.cur()
		// Break the loop if scale is unchanged or perfect, or if we've just had enough.
		} while (
			scale !== ( scale = currentValue() / initial ) && scale !== 1 && --maxIterations
		);
	}

	if ( valueParts ) {
		initialInUnit = +initialInUnit || +initial || 0;

		// Apply relative offset (+=/-=) if specified
		adjusted = valueParts[ 1 ] ?
			initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
			+valueParts[ 2 ];
		if ( tween ) {
			tween.unit = unit;
			tween.start = initialInUnit;
			tween.end = adjusted;
		}
	}
	return adjusted;
}
var rcheckableType = ( /^(?:checkbox|radio)$/i );

var rtagName = ( /<([\w:-]+)/ );

var rscriptType = ( /^$|\/(?:java|ecma)script/i );



// We have to close these tags to support XHTML (#13200)
var wrapMap = {

	// Support: IE9
	option: [ 1, "<select multiple='multiple'>", "</select>" ],

	// XHTML parsers do not magically insert elements in the
	// same way that tag soup parsers do. So we cannot shorten
	// this by omitting <tbody> or other required elements.
	thead: [ 1, "<table>", "</table>" ],
	col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

	_default: [ 0, "", "" ]
};

// Support: IE9
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;


function getAll( context, tag ) {

	// Support: IE9-11+
	// Use typeof to avoid zero-argument method invocation on host objects (#15151)
	var ret = typeof context.getElementsByTagName !== "undefined" ?
			context.getElementsByTagName( tag || "*" ) :
			typeof context.querySelectorAll !== "undefined" ?
				context.querySelectorAll( tag || "*" ) :
			[];

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], ret ) :
		ret;
}


// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		dataPriv.set(
			elems[ i ],
			"globalEval",
			!refElements || dataPriv.get( refElements[ i ], "globalEval" )
		);
	}
}


var rhtml = /<|&#?\w+;/;

function buildFragment( elems, context, scripts, selection, ignored ) {
	var elem, tmp, tag, wrap, contains, j,
		fragment = context.createDocumentFragment(),
		nodes = [],
		i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		elem = elems[ i ];

		if ( elem || elem === 0 ) {

			// Add nodes directly
			if ( jQuery.type( elem ) === "object" ) {

				// Support: Android<4.1, PhantomJS<2
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

			// Convert non-html into a text node
			} else if ( !rhtml.test( elem ) ) {
				nodes.push( context.createTextNode( elem ) );

			// Convert html into DOM nodes
			} else {
				tmp = tmp || fragment.appendChild( context.createElement( "div" ) );

				// Deserialize a standard representation
				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
				wrap = wrapMap[ tag ] || wrapMap._default;
				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

				// Descend through wrappers to the right content
				j = wrap[ 0 ];
				while ( j-- ) {
					tmp = tmp.lastChild;
				}

				// Support: Android<4.1, PhantomJS<2
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, tmp.childNodes );

				// Remember the top-level container
				tmp = fragment.firstChild;

				// Ensure the created nodes are orphaned (#12392)
				tmp.textContent = "";
			}
		}
	}

	// Remove wrapper from fragment
	fragment.textContent = "";

	i = 0;
	while ( ( elem = nodes[ i++ ] ) ) {

		// Skip elements already in the context collection (trac-4087)
		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
			if ( ignored ) {
				ignored.push( elem );
			}
			continue;
		}

		contains = jQuery.contains( elem.ownerDocument, elem );

		// Append to fragment
		tmp = getAll( fragment.appendChild( elem ), "script" );

		// Preserve script evaluation history
		if ( contains ) {
			setGlobalEval( tmp );
		}

		// Capture executables
		if ( scripts ) {
			j = 0;
			while ( ( elem = tmp[ j++ ] ) ) {
				if ( rscriptType.test( elem.type || "" ) ) {
					scripts.push( elem );
				}
			}
		}
	}

	return fragment;
}


( function() {
	var fragment = document.createDocumentFragment(),
		div = fragment.appendChild( document.createElement( "div" ) ),
		input = document.createElement( "input" );

	// Support: Android 4.0-4.3, Safari<=5.1
	// Check state lost if the name is set (#11217)
	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Safari<=5.1, Android<4.2
	// Older WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<=11+
	// Make sure textarea (and checkbox) defaultValue is properly cloned
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;
} )();


var
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

// Support: IE9
// See #13393 for more info
function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

function on( elem, types, selector, data, fn, one ) {
	var origFn, type;

	// Types can be a map of types/handlers
	if ( typeof types === "object" ) {

		// ( types-Object, selector, data )
		if ( typeof selector !== "string" ) {

			// ( types-Object, data )
			data = data || selector;
			selector = undefined;
		}
		for ( type in types ) {
			on( elem, type, selector, data, types[ type ], one );
		}
		return elem;
	}

	if ( data == null && fn == null ) {

		// ( types, fn )
		fn = selector;
		data = selector = undefined;
	} else if ( fn == null ) {
		if ( typeof selector === "string" ) {

			// ( types, selector, fn )
			fn = data;
			data = undefined;
		} else {

			// ( types, data, fn )
			fn = data;
			data = selector;
			selector = undefined;
		}
	}
	if ( fn === false ) {
		fn = returnFalse;
	} else if ( !fn ) {
		return elem;
	}

	if ( one === 1 ) {
		origFn = fn;
		fn = function( event ) {

			// Can use an empty set, since event contains the info
			jQuery().off( event );
			return origFn.apply( this, arguments );
		};

		// Use same guid so caller can remove using origFn
		fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
	}
	return elem.each( function() {
		jQuery.event.add( this, types, fn, data, selector );
	} );
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {

		var handleObjIn, eventHandle, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.get( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !( events = elemData.events ) ) {
			events = elemData.events = {};
		}
		if ( !( eventHandle = elemData.handle ) ) {
			eventHandle = elemData.handle = function( e ) {

				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ?
					jQuery.event.dispatch.apply( elem, arguments ) : undefined;
			};
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend( {
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join( "." )
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !( handlers = events[ type ] ) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener if the special events handler returns false
				if ( !special.setup ||
					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {

		var j, origCount, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.hasData( elem ) && dataPriv.get( elem );

		if ( !elemData || !( events = elemData.events ) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[ 2 ] &&
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector ||
						selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown ||
					special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove data and the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			dataPriv.remove( elem, "handle events" );
		}
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, j, ret, matched, handleObj,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( dataPriv.get( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[ 0 ] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( ( handleObj = matched.handlers[ j++ ] ) &&
				!event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
				// a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.rnamespace || event.rnamespace.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
						handleObj.handler ).apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( ( event.result = ret ) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, matches, sel, handleObj,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Support (at least): Chrome, IE9
		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		//
		// Support: Firefox<=42+
		// Avoid non-left-click in FF but don't block IE radio events (#3861, gh-2343)
		if ( delegateCount && cur.nodeType &&
			( event.type !== "click" || isNaN( event.button ) || event.button < 1 ) ) {

			for ( ; cur !== this; cur = cur.parentNode || this ) {

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && ( cur.disabled !== true || event.type !== "click" ) ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) > -1 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push( { elem: cur, handlers: matches } );
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push( { elem: this, handlers: handlers.slice( delegateCount ) } );
		}

		return handlerQueue;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: ( "altKey bubbles cancelable ctrlKey currentTarget detail eventPhase " +
		"metaKey relatedTarget shiftKey target timeStamp view which" ).split( " " ),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split( " " ),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: ( "button buttons clientX clientY offsetX offsetY pageX pageY " +
			"screenX screenY toElement" ).split( " " ),
		filter: function( event, original ) {
			var eventDoc, doc, body,
				button = original.button;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX +
					( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) -
					( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY +
					( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) -
					( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: Cordova 2.5 (WebKit) (#13255)
		// All events should have a target; Cordova deviceready doesn't
		if ( !event.target ) {
			event.target = document;
		}

		// Support: Safari 6.0+, Chrome<28
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	special: {
		load: {

			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {

			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					this.focus();
					return false;
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {

			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( this.type === "checkbox" && this.click && jQuery.nodeName( this, "input" ) ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	}
};

jQuery.removeEvent = function( elem, type, handle ) {

	// This "if" is needed for plain objects
	if ( elem.removeEventListener ) {
		elem.removeEventListener( type, handle );
	}
};

jQuery.Event = function( src, props ) {

	// Allow instantiation without the 'new' keyword
	if ( !( this instanceof jQuery.Event ) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&

				// Support: Android<4.0
				src.returnValue === false ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	constructor: jQuery.Event,
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;

		if ( e ) {
			e.preventDefault();
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( e ) {
			e.stopPropagation();
		}
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://code.google.com/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each( {
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mouseenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
} );

jQuery.fn.extend( {
	on: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn );
	},
	one: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {

			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ?
					handleObj.origType + "." + handleObj.namespace :
					handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {

			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {

			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each( function() {
			jQuery.event.remove( this, types, fn, selector );
		} );
	}
} );


var
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,

	// Support: IE 10-11, Edge 10240+
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,

	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName( "tbody" )[ 0 ] ||
			elem.appendChild( elem.ownerDocument.createElement( "tbody" ) ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = ( elem.getAttribute( "type" ) !== null ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );

	if ( match ) {
		elem.type = match[ 1 ];
	} else {
		elem.removeAttribute( "type" );
	}

	return elem;
}

function cloneCopyEvent( src, dest ) {
	var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

	if ( dest.nodeType !== 1 ) {
		return;
	}

	// 1. Copy private data: events, handlers, etc.
	if ( dataPriv.hasData( src ) ) {
		pdataOld = dataPriv.access( src );
		pdataCur = dataPriv.set( dest, pdataOld );
		events = pdataOld.events;

		if ( events ) {
			delete pdataCur.handle;
			pdataCur.events = {};

			for ( type in events ) {
				for ( i = 0, l = events[ type ].length; i < l; i++ ) {
					jQuery.event.add( dest, type, events[ type ][ i ] );
				}
			}
		}
	}

	// 2. Copy user data
	if ( dataUser.hasData( src ) ) {
		udataOld = dataUser.access( src );
		udataCur = jQuery.extend( {}, udataOld );

		dataUser.set( dest, udataCur );
	}
}

// Fix IE bugs, see support tests
function fixInput( src, dest ) {
	var nodeName = dest.nodeName.toLowerCase();

	// Fails to persist the checked state of a cloned checkbox or radio button.
	if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		dest.checked = src.checked;

	// Fails to return the selected option to the default selected state when cloning options
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

function domManip( collection, args, callback, ignored ) {

	// Flatten any nested arrays
	args = concat.apply( [], args );

	var fragment, first, scripts, hasScripts, node, doc,
		i = 0,
		l = collection.length,
		iNoClone = l - 1,
		value = args[ 0 ],
		isFunction = jQuery.isFunction( value );

	// We can't cloneNode fragments that contain checked, in WebKit
	if ( isFunction ||
			( l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test( value ) ) ) {
		return collection.each( function( index ) {
			var self = collection.eq( index );
			if ( isFunction ) {
				args[ 0 ] = value.call( this, index, self.html() );
			}
			domManip( self, args, callback, ignored );
		} );
	}

	if ( l ) {
		fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
		first = fragment.firstChild;

		if ( fragment.childNodes.length === 1 ) {
			fragment = first;
		}

		// Require either new content or an interest in ignored elements to invoke the callback
		if ( first || ignored ) {
			scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
			hasScripts = scripts.length;

			// Use the original fragment for the last item
			// instead of the first because it can end up
			// being emptied incorrectly in certain situations (#8070).
			for ( ; i < l; i++ ) {
				node = fragment;

				if ( i !== iNoClone ) {
					node = jQuery.clone( node, true, true );

					// Keep references to cloned scripts for later restoration
					if ( hasScripts ) {

						// Support: Android<4.1, PhantomJS<2
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( scripts, getAll( node, "script" ) );
					}
				}

				callback.call( collection[ i ], node, i );
			}

			if ( hasScripts ) {
				doc = scripts[ scripts.length - 1 ].ownerDocument;

				// Reenable scripts
				jQuery.map( scripts, restoreScript );

				// Evaluate executable scripts on first document insertion
				for ( i = 0; i < hasScripts; i++ ) {
					node = scripts[ i ];
					if ( rscriptType.test( node.type || "" ) &&
						!dataPriv.access( node, "globalEval" ) &&
						jQuery.contains( doc, node ) ) {

						if ( node.src ) {

							// Optional AJAX dependency, but won't run scripts if not present
							if ( jQuery._evalUrl ) {
								jQuery._evalUrl( node.src );
							}
						} else {
							jQuery.globalEval( node.textContent.replace( rcleanScript, "" ) );
						}
					}
				}
			}
		}
	}

	return collection;
}

function remove( elem, selector, keepData ) {
	var node,
		nodes = selector ? jQuery.filter( selector, elem ) : elem,
		i = 0;

	for ( ; ( node = nodes[ i ] ) != null; i++ ) {
		if ( !keepData && node.nodeType === 1 ) {
			jQuery.cleanData( getAll( node ) );
		}

		if ( node.parentNode ) {
			if ( keepData && jQuery.contains( node.ownerDocument, node ) ) {
				setGlobalEval( getAll( node, "script" ) );
			}
			node.parentNode.removeChild( node );
		}
	}

	return elem;
}

jQuery.extend( {
	htmlPrefilter: function( html ) {
		return html.replace( rxhtmlTag, "<$1></$2>" );
	},

	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var i, l, srcElements, destElements,
			clone = elem.cloneNode( true ),
			inPage = jQuery.contains( elem.ownerDocument, elem );

		// Fix IE cloning issues
		if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
				!jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			for ( i = 0, l = srcElements.length; i < l; i++ ) {
				fixInput( srcElements[ i ], destElements[ i ] );
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					cloneCopyEvent( srcElements[ i ], destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		// Return the cloned set
		return clone;
	},

	cleanData: function( elems ) {
		var data, elem, type,
			special = jQuery.event.special,
			i = 0;

		for ( ; ( elem = elems[ i ] ) !== undefined; i++ ) {
			if ( acceptData( elem ) ) {
				if ( ( data = elem[ dataPriv.expando ] ) ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Support: Chrome <= 35-45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataPriv.expando ] = undefined;
				}
				if ( elem[ dataUser.expando ] ) {

					// Support: Chrome <= 35-45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataUser.expando ] = undefined;
				}
			}
		}
	}
} );

jQuery.fn.extend( {

	// Keep domManip exposed until 3.0 (gh-2225)
	domManip: domManip,

	detach: function( selector ) {
		return remove( this, selector, true );
	},

	remove: function( selector ) {
		return remove( this, selector );
	},

	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().each( function() {
					if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
						this.textContent = value;
					}
				} );
		}, null, value, arguments.length );
	},

	append: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		} );
	},

	prepend: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		} );
	},

	before: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		} );
	},

	after: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		} );
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; ( elem = this[ i ] ) != null; i++ ) {
			if ( elem.nodeType === 1 ) {

				// Prevent memory leaks
				jQuery.cleanData( getAll( elem, false ) );

				// Remove any remaining nodes
				elem.textContent = "";
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		} );
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined && elem.nodeType === 1 ) {
				return elem.innerHTML;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = jQuery.htmlPrefilter( value );

				try {
					for ( ; i < l; i++ ) {
						elem = this[ i ] || {};

						// Remove element nodes and prevent memory leaks
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch ( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var ignored = [];

		// Make the changes, replacing each non-ignored context element with the new content
		return domManip( this, arguments, function( elem ) {
			var parent = this.parentNode;

			if ( jQuery.inArray( this, ignored ) < 0 ) {
				jQuery.cleanData( getAll( this ) );
				if ( parent ) {
					parent.replaceChild( elem, this );
				}
			}

		// Force callback invocation
		}, ignored );
	}
} );

jQuery.each( {
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1,
			i = 0;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Support: QtWebKit
			// .get() because push.apply(_, arraylike) throws
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
} );


var iframe,
	elemdisplay = {

		// Support: Firefox
		// We have to pre-define these values for FF (#10227)
		HTML: "block",
		BODY: "block"
	};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */

// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		display = jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = ( iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" ) )
				.appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = iframe[ 0 ].contentDocument;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}
var rmargin = ( /^margin/ );

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var getStyles = function( elem ) {

		// Support: IE<=11+, Firefox<=30+ (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if ( !view || !view.opener ) {
			view = window;
		}

		return view.getComputedStyle( elem );
	};

var swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var documentElement = document.documentElement;



( function() {
	var pixelPositionVal, boxSizingReliableVal, pixelMarginRightVal, reliableMarginLeftVal,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	// Finish early in limited (non-browser) environments
	if ( !div.style ) {
		return;
	}

	// Support: IE9-11+
	// Style of cloned element affects source element cloned (#8908)
	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;" +
		"padding:0;margin-top:1px;position:absolute";
	container.appendChild( div );

	// Executing both pixelPosition & boxSizingReliable tests require only one layout
	// so they're executed at the same time to save the second computation.
	function computeStyleTests() {
		div.style.cssText =

			// Support: Firefox<29, Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;" +
			"position:relative;display:block;" +
			"margin:auto;border:1px;padding:1px;" +
			"top:1%;width:50%";
		div.innerHTML = "";
		documentElement.appendChild( container );

		var divStyle = window.getComputedStyle( div );
		pixelPositionVal = divStyle.top !== "1%";
		reliableMarginLeftVal = divStyle.marginLeft === "2px";
		boxSizingReliableVal = divStyle.width === "4px";

		// Support: Android 4.0 - 4.3 only
		// Some styles come back with percentage values, even though they shouldn't
		div.style.marginRight = "50%";
		pixelMarginRightVal = divStyle.marginRight === "4px";

		documentElement.removeChild( container );
	}

	jQuery.extend( support, {
		pixelPosition: function() {

			// This test is executed only once but we still do memoizing
			// since we can use the boxSizingReliable pre-computing.
			// No need to check if the test was already performed, though.
			computeStyleTests();
			return pixelPositionVal;
		},
		boxSizingReliable: function() {
			if ( boxSizingReliableVal == null ) {
				computeStyleTests();
			}
			return boxSizingReliableVal;
		},
		pixelMarginRight: function() {

			// Support: Android 4.0-4.3
			// We're checking for boxSizingReliableVal here instead of pixelMarginRightVal
			// since that compresses better and they're computed together anyway.
			if ( boxSizingReliableVal == null ) {
				computeStyleTests();
			}
			return pixelMarginRightVal;
		},
		reliableMarginLeft: function() {

			// Support: IE <=8 only, Android 4.0 - 4.3 only, Firefox <=3 - 37
			if ( boxSizingReliableVal == null ) {
				computeStyleTests();
			}
			return reliableMarginLeftVal;
		},
		reliableMarginRight: function() {

			// Support: Android 2.3
			// Check if div with explicit width and no margin-right incorrectly
			// gets computed margin-right based on width of container. (#3333)
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			// This support function is only executed once so no memoizing is needed.
			var ret,
				marginDiv = div.appendChild( document.createElement( "div" ) );

			// Reset CSS: box-sizing; display; margin; border; padding
			marginDiv.style.cssText = div.style.cssText =

				// Support: Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;box-sizing:content-box;" +
				"display:block;margin:0;border:0;padding:0";
			marginDiv.style.marginRight = marginDiv.style.width = "0";
			div.style.width = "1px";
			documentElement.appendChild( container );

			ret = !parseFloat( window.getComputedStyle( marginDiv ).marginRight );

			documentElement.removeChild( container );
			div.removeChild( marginDiv );

			return ret;
		}
	} );
} )();


function curCSS( elem, name, computed ) {
	var width, minWidth, maxWidth, ret,
		style = elem.style;

	computed = computed || getStyles( elem );
	ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined;

	// Support: Opera 12.1x only
	// Fall back to style even without computed
	// computed is undefined for elems on document fragments
	if ( ( ret === "" || ret === undefined ) && !jQuery.contains( elem.ownerDocument, elem ) ) {
		ret = jQuery.style( elem, name );
	}

	// Support: IE9
	// getPropertyValue is only needed for .css('filter') (#12537)
	if ( computed ) {

		// A tribute to the "awesome hack by Dean Edwards"
		// Android Browser returns percentage for some values,
		// but width seems to be reliably pixels.
		// This is against the CSSOM draft spec:
		// http://dev.w3.org/csswg/cssom/#resolved-values
		if ( !support.pixelMarginRight() && rnumnonpx.test( ret ) && rmargin.test( name ) ) {

			// Remember the original values
			width = style.width;
			minWidth = style.minWidth;
			maxWidth = style.maxWidth;

			// Put in the new values to get a computed value out
			style.minWidth = style.maxWidth = style.width = ret;
			ret = computed.width;

			// Revert the changed values
			style.width = width;
			style.minWidth = minWidth;
			style.maxWidth = maxWidth;
		}
	}

	return ret !== undefined ?

		// Support: IE9-11+
		// IE returns zIndex value as an integer.
		ret + "" :
		ret;
}


function addGetHookIf( conditionFn, hookFn ) {

	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {

				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return ( this.get = hookFn ).apply( this, arguments );
		}
	};
}


var

	// Swappable if display is none or starts with table
	// except "table", "table-cell", or "table-caption"
	// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ],
	emptyStyle = document.createElement( "div" ).style;

// Return a css property mapped to a potentially vendor prefixed property
function vendorPropName( name ) {

	// Shortcut for names that are not vendor prefixed
	if ( name in emptyStyle ) {
		return name;
	}

	// Check for vendor prefixed names
	var capName = name[ 0 ].toUpperCase() + name.slice( 1 ),
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in emptyStyle ) {
			return name;
		}
	}
}

function setPositiveNumber( elem, value, subtract ) {

	// Any relative (+/-) values have already been
	// normalized at this point
	var matches = rcssNum.exec( value );
	return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 2 ] - ( subtract || 0 ) ) + ( matches[ 3 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?

		// If we already have the right measurement, avoid augmentation
		4 :

		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {

		// Both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {

			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// At this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {

			// At this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// At this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// Support: IE11 only
	// In IE 11 fullscreen elements inside of an iframe have
	// 100x too small dimensions (gh-1764).
	if ( document.msFullscreenElement && window.top !== window ) {

		// Support: IE11 only
		// Running getBoundingClientRect on a disconnected node
		// in IE throws an error.
		if ( elem.getClientRects().length ) {
			val = Math.round( elem.getBoundingClientRect()[ name ] * 100 );
		}
	}

	// Some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {

		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test( val ) ) {
			return val;
		}

		// Check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox &&
			( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// Use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = dataPriv.get( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {

			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] = dataPriv.access(
					elem,
					"olddisplay",
					defaultDisplay( elem.nodeName )
				);
			}
		} else {
			hidden = isHidden( elem );

			if ( display !== "none" || !hidden ) {
				dataPriv.set(
					elem,
					"olddisplay",
					hidden ? display : jQuery.css( elem, "display" )
				);
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

jQuery.extend( {

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"animationIterationCount": true,
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		"float": "cssFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// Gets hook for the prefixed version, then unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
				value = adjustCSS( elem, name, ret );

				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set (#7116)
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add the unit (except for certain CSS properties)
			if ( type === "number" ) {
				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
			}

			// Support: IE9-11+
			// background-* props affect original clone's values
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !( "set" in hooks ) ||
				( value = hooks.set( elem, value, extra ) ) !== undefined ) {

				style[ name ] = value;
			}

		} else {

			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks &&
				( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var val, num, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// Try prefixed name followed by the unprefixed name
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		// Convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Make numeric if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || isFinite( num ) ? num || 0 : val;
		}
		return val;
	}
} );

jQuery.each( [ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// Certain elements can have dimension info if we invisibly show them
				// but it must have a current display style that would benefit
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&
					elem.offsetWidth === 0 ?
						swap( elem, cssShow, function() {
							return getWidthOrHeight( elem, name, extra );
						} ) :
						getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var matches,
				styles = extra && getStyles( elem ),
				subtract = extra && augmentWidthOrHeight(
					elem,
					name,
					extra,
					jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				);

			// Convert to pixels if value adjustment is needed
			if ( subtract && ( matches = rcssNum.exec( value ) ) &&
				( matches[ 3 ] || "px" ) !== "px" ) {

				elem.style[ name ] = value;
				value = jQuery.css( elem, name );
			}

			return setPositiveNumber( elem, value, subtract );
		}
	};
} );

jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
	function( elem, computed ) {
		if ( computed ) {
			return ( parseFloat( curCSS( elem, "marginLeft" ) ) ||
				elem.getBoundingClientRect().left -
					swap( elem, { marginLeft: 0 }, function() {
						return elem.getBoundingClientRect().left;
					} )
				) + "px";
		}
	}
);

// Support: Android 2.3
jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			return swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each( {
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// Assumes a single number if not a string
				parts = typeof value === "string" ? value.split( " " ) : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
} );

jQuery.fn.extend( {
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each( function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		} );
	}
} );


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || jQuery.easing._default;
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			// Use a property on the element directly when it is not a DOM element,
			// or when there is no matching style property that exists.
			if ( tween.elem.nodeType !== 1 ||
				tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
				return tween.elem[ tween.prop ];
			}

			// Passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails.
			// Simple values such as "10px" are parsed to Float;
			// complex values such as "rotate(1rad)" are returned as-is.
			result = jQuery.css( tween.elem, tween.prop, "" );

			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {

			// Use step hook for back compat.
			// Use cssHook if its there.
			// Use .style if available and use plain properties where available.
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.nodeType === 1 &&
				( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null ||
					jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE9
// Panic based approach to setting things on disconnected nodes
Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	},
	_default: "swing"
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rrun = /queueHooks$/;

// Animations created synchronously will run synchronously
function createFxNow() {
	window.setTimeout( function() {
		fxNow = undefined;
	} );
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		i = 0,
		attrs = { height: type };

	// If we include width, step value is 1 to do all cssExpand values,
	// otherwise step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

			// We're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = dataPriv.get( elem, "fxshow" );

	// Handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always( function() {

			// Ensure the complete handler is called before this completes
			anim.always( function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			} );
		} );
	}

	// Height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {

		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE9-10 do not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			dataPriv.get( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {
			style.display = "inline-block";
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		anim.always( function() {
			style.overflow = opts.overflow[ 0 ];
			style.overflowX = opts.overflow[ 1 ];
			style.overflowY = opts.overflow[ 2 ];
		} );
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show
				// and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

		// Any non-fx value stops us from restoring the original display value
		} else {
			display = undefined;
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = dataPriv.access( elem, "fxshow", {} );
		}

		// Store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done( function() {
				jQuery( elem ).hide();
			} );
		}
		anim.done( function() {
			var prop;

			dataPriv.remove( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		} );
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}

	// If this is a noop like .hide().hide(), restore an overwritten display value
	} else if ( ( display === "none" ? defaultDisplay( elem.nodeName ) : display ) === "inline" ) {
		style.display = display;
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// Not quite $.extend, this won't overwrite existing keys.
			// Reusing 'index' because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = Animation.prefilters.length,
		deferred = jQuery.Deferred().always( function() {

			// Don't match elem in the :animated selector
			delete tick.elem;
		} ),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

				// Support: Android 2.3
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ] );

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise( {
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,

					// If we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// Resolve when we played the last frame; otherwise, reject
				if ( gotoEnd ) {
					deferred.notifyWith( elem, [ animation, 1, 0 ] );
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		} ),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			if ( jQuery.isFunction( result.stop ) ) {
				jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
					jQuery.proxy( result.stop, result );
			}
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		} )
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {
	tweeners: {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value );
			adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
			return tween;
		} ]
	},

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.match( rnotwhite );
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
			Animation.tweeners[ prop ].unshift( callback );
		}
	},

	prefilters: [ defaultPrefilter ],

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			Animation.prefilters.unshift( callback );
		} else {
			Animation.prefilters.push( callback );
		}
	}
} );

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ?
		opt.duration : opt.duration in jQuery.fx.speeds ?
			jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// Normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend( {
	fadeTo: function( speed, to, easing, callback ) {

		// Show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// Animate to the value specified
			.end().animate( { opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || dataPriv.get( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each( function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = dataPriv.get( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this &&
					( type == null || timers[ index ].queue === type ) ) {

					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// Start the next in the queue if the last step wasn't forced.
			// Timers currently will call their complete callbacks, which
			// will dequeue but only if they were gotoEnd.
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		} );
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each( function() {
			var index,
				data = dataPriv.get( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// Enable finishing flag on private data
			data.finish = true;

			// Empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// Look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// Look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// Turn off finishing flag
			delete data.finish;
		} );
	}
} );

jQuery.each( [ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
} );

// Generate shortcuts for custom animations
jQuery.each( {
	slideDown: genFx( "show" ),
	slideUp: genFx( "hide" ),
	slideToggle: genFx( "toggle" ),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
} );

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		i = 0,
		timers = jQuery.timers;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];

		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;
jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = window.setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	window.clearInterval( timerId );

	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,

	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = window.setTimeout( next, time );
		hooks.stop = function() {
			window.clearTimeout( timeout );
		};
	} );
};


( function() {
	var input = document.createElement( "input" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	input.type = "checkbox";

	// Support: iOS<=5.1, Android<=4.2+
	// Default value for a checkbox should be "on"
	support.checkOn = input.value !== "";

	// Support: IE<=11+
	// Must access selectedIndex to make default options select
	support.optSelected = opt.selected;

	// Support: Android<=2.3
	// Options inside disabled selects are incorrectly marked as disabled
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE<=11+
	// An input loses its value after becoming a radio
	input = document.createElement( "input" );
	input.value = "t";
	input.type = "radio";
	support.radioValue = input.value === "t";
} )();


var boolHook,
	attrHandle = jQuery.expr.attrHandle;

jQuery.fn.extend( {
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each( function() {
			jQuery.removeAttr( this, name );
		} );
	}
} );

jQuery.extend( {
	attr: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set attributes on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : undefined );
		}

		if ( value !== undefined ) {
			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;
			}

			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			elem.setAttribute( name, value + "" );
			return value;
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		ret = jQuery.find.attr( elem, name );

		// Non-existent attributes return null, we normalize to undefined
		return ret == null ? undefined : ret;
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					jQuery.nodeName( elem, "input" ) ) {
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( ( name = attrNames[ i++ ] ) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {

					// Set corresponding property to false
					elem[ propName ] = false;
				}

				elem.removeAttribute( name );
			}
		}
	}
} );

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {

			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else {
			elem.setAttribute( name, name );
		}
		return name;
	}
};
jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = function( elem, name, isXML ) {
		var ret, handle;
		if ( !isXML ) {

			// Avoid an infinite loop by temporarily removing this function from the getter
			handle = attrHandle[ name ];
			attrHandle[ name ] = ret;
			ret = getter( elem, name, isXML ) != null ?
				name.toLowerCase() :
				null;
			attrHandle[ name ] = handle;
		}
		return ret;
	};
} );




var rfocusable = /^(?:input|select|textarea|button)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend( {
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		return this.each( function() {
			delete this[ jQuery.propFix[ name ] || name ];
		} );
	}
} );

jQuery.extend( {
	prop: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			return ( elem[ name ] = value );
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		return elem[ name ];
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {

				// elem.tabIndex doesn't always return the
				// correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				return tabindex ?
					parseInt( tabindex, 10 ) :
					rfocusable.test( elem.nodeName ) ||
						rclickable.test( elem.nodeName ) && elem.href ?
							0 :
							-1;
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	}
} );

// Support: IE <=11 only
// Accessing the selectedIndex property
// forces the browser to respect setting selected
// on the option
// The getter ensures a default option is selected
// when in an optgroup
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;
			if ( parent && parent.parentNode ) {
				parent.parentNode.selectedIndex;
			}
			return null;
		},
		set: function( elem ) {
			var parent = elem.parentNode;
			if ( parent ) {
				parent.selectedIndex;

				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
		}
	};
}

jQuery.each( [
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
} );




var rclass = /[\t\r\n\f]/g;

function getClass( elem ) {
	return elem.getAttribute && elem.getAttribute( "class" ) || "";
}

jQuery.fn.extend( {
	addClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnotwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );
				cur = elem.nodeType === 1 &&
					( " " + curValue + " " ).replace( rclass, " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( !arguments.length ) {
			return this.attr( "class", "" );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnotwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );

				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 &&
					( " " + curValue + " " ).replace( rclass, " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {

						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( i ) {
				jQuery( this ).toggleClass(
					value.call( this, i, getClass( this ), stateVal ),
					stateVal
				);
			} );
		}

		return this.each( function() {
			var className, i, self, classNames;

			if ( type === "string" ) {

				// Toggle individual class names
				i = 0;
				self = jQuery( this );
				classNames = value.match( rnotwhite ) || [];

				while ( ( className = classNames[ i++ ] ) ) {

					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( value === undefined || type === "boolean" ) {
				className = getClass( this );
				if ( className ) {

					// Store className if set
					dataPriv.set( this, "__className__", className );
				}

				// If the element has a class name or if we're passed `false`,
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				if ( this.setAttribute ) {
					this.setAttribute( "class",
						className || value === false ?
						"" :
						dataPriv.get( this, "__className__" ) || ""
					);
				}
			}
		} );
	},

	hasClass: function( selector ) {
		var className, elem,
			i = 0;

		className = " " + selector + " ";
		while ( ( elem = this[ i++ ] ) ) {
			if ( elem.nodeType === 1 &&
				( " " + getClass( elem ) + " " ).replace( rclass, " " )
					.indexOf( className ) > -1
			) {
				return true;
			}
		}

		return false;
	}
} );




var rreturn = /\r/g,
	rspaces = /[\x20\t\r\n\f]+/g;

jQuery.fn.extend( {
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[ 0 ];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] ||
					jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks &&
					"get" in hooks &&
					( ret = hooks.get( elem, "value" ) ) !== undefined
				) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?

					// Handle most common string cases
					ret.replace( rreturn, "" ) :

					// Handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each( function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";

			} else if ( typeof val === "number" ) {
				val += "";

			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				} );
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		} );
	}
} );

jQuery.extend( {
	valHooks: {
		option: {
			get: function( elem ) {

				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :

					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					// Strip and collapse whitespace
					// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
					jQuery.trim( jQuery.text( elem ) ).replace( rspaces, " " );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// IE8-9 doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&

							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ?
								!option.disabled : option.getAttribute( "disabled" ) === null ) &&
							( !option.parentNode.disabled ||
								!jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];
					if ( option.selected =
						jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1
					) {
						optionSet = true;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	}
} );

// Radios and checkboxes getter/setter
jQuery.each( [ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute( "value" ) === null ? "on" : elem.value;
		};
	}
} );




// Return jQuery for attributes-only inclusion


var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/;

jQuery.extend( jQuery.event, {

	trigger: function( event, data, elem, onlyHandlers ) {

		var i, cur, tmp, bubbleType, ontype, handle, special,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "." ) > -1 ) {

			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split( "." );
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf( ":" ) < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join( "." );
		event.rnamespace = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === ( elem.ownerDocument || document ) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( dataPriv.get( cur, "events" ) || {} )[ event.type ] &&
				dataPriv.get( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( ( !special._default ||
				special._default.apply( eventPath.pop(), data ) === false ) &&
				acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name name as the event.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && jQuery.isFunction( elem[ type ] ) && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					elem[ type ]();
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	// Piggyback on a donor event to simulate a different one
	simulate: function( type, elem, event ) {
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true

				// Previously, `originalEvent: {}` was set here, so stopPropagation call
				// would not be triggered on donor event, since in our own
				// jQuery.event.stopPropagation function we had a check for existence of
				// originalEvent.stopPropagation method, so, consequently it would be a noop.
				//
				// But now, this "simulate" function is used only for events
				// for which stopPropagation() is noop, so there is no need for that anymore.
				//
				// For the 1.x branch though, guard for "click" and "submit"
				// events is still used, but was moved to jQuery.event.stopPropagation function
				// because `originalEvent` should point to the original event for the constancy
				// with other events and for more focused logic
			}
		);

		jQuery.event.trigger( e, null, elem );

		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}

} );

jQuery.fn.extend( {

	trigger: function( type, data ) {
		return this.each( function() {
			jQuery.event.trigger( type, data, this );
		} );
	},
	triggerHandler: function( type, data ) {
		var elem = this[ 0 ];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
} );


jQuery.each( ( "blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu" ).split( " " ),
	function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
} );

jQuery.fn.extend( {
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
} );




support.focusin = "onfocusin" in window;


// Support: Firefox
// Firefox doesn't have focus(in | out) events
// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Support: Chrome, Safari
// focus(in | out) events fire after focus & blur events,
// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Related ticket - https://code.google.com/p/chromium/issues/detail?id=449857
if ( !support.focusin ) {
	jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
			jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
		};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = dataPriv.access( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				dataPriv.access( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = dataPriv.access( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					dataPriv.remove( doc, fix );

				} else {
					dataPriv.access( doc, fix, attaches );
				}
			}
		};
	} );
}
var location = window.location;

var nonce = jQuery.now();

var rquery = ( /\?/ );



// Support: Android 2.3
// Workaround failure to string-cast null input
jQuery.parseJSON = function( data ) {
	return JSON.parse( data + "" );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml;
	if ( !data || typeof data !== "string" ) {
		return null;
	}

	// Support: IE9
	try {
		xml = ( new window.DOMParser() ).parseFromString( data, "text/xml" );
	} catch ( e ) {
		xml = undefined;
	}

	if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,

	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Anchor tag for parsing the document origin
	originAnchor = document.createElement( "a" );
	originAnchor.href = location.href;

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {

			// For each dataType in the dataTypeExpression
			while ( ( dataType = dataTypes[ i++ ] ) ) {

				// Prepend if requested
				if ( dataType[ 0 ] === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

				// Otherwise append
				} else {
					( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" &&
				!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		} );
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var key, deep,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {

	var ct, type, finalDataType, firstDataType,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {

		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}

		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},

		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

		// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {

								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s.throws ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return {
								state: "parsererror",
								error: conv ? e : "No conversion from " + prev + " to " + current
							};
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend( {

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: location.href,
		type: "GET",
		isLocal: rlocalProtocol.test( location.protocol ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /\bxml\b/,
			html: /\bhtml/,
			json: /\bjson\b/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var transport,

			// URL without anti-cache param
			cacheURL,

			// Response headers
			responseHeadersString,
			responseHeaders,

			// timeout handle
			timeoutTimer,

			// Url cleanup var
			urlAnchor,

			// To know if global events are to be dispatched
			fireGlobals,

			// Loop variable
			i,

			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),

			// Callbacks context
			callbackContext = s.context || s,

			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context &&
				( callbackContext.nodeType || callbackContext.jquery ) ?
					jQuery( callbackContext ) :
					jQuery.event,

			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),

			// Status-dependent callbacks
			statusCode = s.statusCode || {},

			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},

			// The jqXHR state
			state = 0,

			// Default abort message
			strAbort = "canceled",

			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[ 1 ].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {

								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {

							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (prefilters might expect it)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || location.href ) + "" ).replace( rhash, "" )
			.replace( rprotocol, location.protocol + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when the origin doesn't match the current origin.
		if ( s.crossDomain == null ) {
			urlAnchor = document.createElement( "a" );

			// Support: IE8-11+
			// IE throws exception if url is malformed, e.g. http://example.com:80x/
			try {
				urlAnchor.href = s.url;

				// Support: IE8-11+
				// Anchor's host property isn't correctly set when s.url is relative
				urlAnchor.href = urlAnchor.href;
				s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !==
					urlAnchor.protocol + "//" + urlAnchor.host;
			} catch ( e ) {

				// If there is an error parsing the URL, assume it is crossDomain,
				// it can be rejected by the transport if it is invalid
				s.crossDomain = true;
			}
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );

				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
				s.accepts[ s.dataTypes[ 0 ] ] +
					( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend &&
			( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {

			// Abort if not done already and return
			return jqXHR.abort();
		}

		// Aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}

			// If request was aborted inside ajaxSend, stop there
			if ( state === 2 ) {
				return jqXHR;
			}

			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = window.setTimeout( function() {
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {

				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );

				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				window.clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader( "Last-Modified" );
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader( "etag" );
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {

				// Extract error from statusText and normalize for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
} );

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {

		// Shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		// The url can be an options object (which then must have .url)
		return jQuery.ajax( jQuery.extend( {
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		}, jQuery.isPlainObject( url ) && url ) );
	};
} );


jQuery._evalUrl = function( url ) {
	return jQuery.ajax( {
		url: url,

		// Make this explicit, since user can override this through ajaxSetup (#11264)
		type: "GET",
		dataType: "script",
		async: false,
		global: false,
		"throws": true
	} );
};


jQuery.fn.extend( {
	wrapAll: function( html ) {
		var wrap;

		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapAll( html.call( this, i ) );
			} );
		}

		if ( this[ 0 ] ) {

			// The elements to wrap the target around
			wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map( function() {
				var elem = this;

				while ( elem.firstElementChild ) {
					elem = elem.firstElementChild;
				}

				return elem;
			} ).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapInner( html.call( this, i ) );
			} );
		}

		return this.each( function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		} );
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each( function( i ) {
			jQuery( this ).wrapAll( isFunction ? html.call( this, i ) : html );
		} );
	},

	unwrap: function() {
		return this.parent().each( function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		} ).end();
	}
} );


jQuery.expr.filters.hidden = function( elem ) {
	return !jQuery.expr.filters.visible( elem );
};
jQuery.expr.filters.visible = function( elem ) {

	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	// Use OR instead of AND as the element is not visible if either is true
	// See tickets #10406 and #13132
	return elem.offsetWidth > 0 || elem.offsetHeight > 0 || elem.getClientRects().length > 0;
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {

		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {

				// Treat each array item as a scalar.
				add( prefix, v );

			} else {

				// Item is non-scalar (array or object), encode its numeric index.
				buildParams(
					prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
					v,
					traditional,
					add
				);
			}
		} );

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {

		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {

		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {

			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		} );

	} else {

		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend( {
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map( function() {

			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		} )
		.filter( function() {
			var type = this.type;

			// Use .is( ":disabled" ) so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		} )
		.map( function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					} ) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		} ).get();
	}
} );


jQuery.ajaxSettings.xhr = function() {
	try {
		return new window.XMLHttpRequest();
	} catch ( e ) {}
};

var xhrSuccessStatus = {

		// File protocol always yields status code 0, assume 200
		0: 200,

		// Support: IE9
		// #1450: sometimes IE returns 1223 when it should be 204
		1223: 204
	},
	xhrSupported = jQuery.ajaxSettings.xhr();

support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
support.ajax = xhrSupported = !!xhrSupported;

jQuery.ajaxTransport( function( options ) {
	var callback, errorCallback;

	// Cross domain only allowed if supported through XMLHttpRequest
	if ( support.cors || xhrSupported && !options.crossDomain ) {
		return {
			send: function( headers, complete ) {
				var i,
					xhr = options.xhr();

				xhr.open(
					options.type,
					options.url,
					options.async,
					options.username,
					options.password
				);

				// Apply custom fields if provided
				if ( options.xhrFields ) {
					for ( i in options.xhrFields ) {
						xhr[ i ] = options.xhrFields[ i ];
					}
				}

				// Override mime type if needed
				if ( options.mimeType && xhr.overrideMimeType ) {
					xhr.overrideMimeType( options.mimeType );
				}

				// X-Requested-With header
				// For cross-domain requests, seeing as conditions for a preflight are
				// akin to a jigsaw puzzle, we simply never set it to be sure.
				// (it can always be set on a per-request basis or even using ajaxSetup)
				// For same-domain requests, won't change header if already provided.
				if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
					headers[ "X-Requested-With" ] = "XMLHttpRequest";
				}

				// Set headers
				for ( i in headers ) {
					xhr.setRequestHeader( i, headers[ i ] );
				}

				// Callback
				callback = function( type ) {
					return function() {
						if ( callback ) {
							callback = errorCallback = xhr.onload =
								xhr.onerror = xhr.onabort = xhr.onreadystatechange = null;

							if ( type === "abort" ) {
								xhr.abort();
							} else if ( type === "error" ) {

								// Support: IE9
								// On a manual native abort, IE9 throws
								// errors on any property access that is not readyState
								if ( typeof xhr.status !== "number" ) {
									complete( 0, "error" );
								} else {
									complete(

										// File: protocol always yields status 0; see #8605, #14207
										xhr.status,
										xhr.statusText
									);
								}
							} else {
								complete(
									xhrSuccessStatus[ xhr.status ] || xhr.status,
									xhr.statusText,

									// Support: IE9 only
									// IE9 has no XHR2 but throws on binary (trac-11426)
									// For XHR2 non-text, let the caller handle it (gh-2498)
									( xhr.responseType || "text" ) !== "text"  ||
									typeof xhr.responseText !== "string" ?
										{ binary: xhr.response } :
										{ text: xhr.responseText },
									xhr.getAllResponseHeaders()
								);
							}
						}
					};
				};

				// Listen to events
				xhr.onload = callback();
				errorCallback = xhr.onerror = callback( "error" );

				// Support: IE9
				// Use onreadystatechange to replace onabort
				// to handle uncaught aborts
				if ( xhr.onabort !== undefined ) {
					xhr.onabort = errorCallback;
				} else {
					xhr.onreadystatechange = function() {

						// Check readyState before timeout as it changes
						if ( xhr.readyState === 4 ) {

							// Allow onerror to be called first,
							// but that will not handle a native abort
							// Also, save errorCallback to a variable
							// as xhr.onerror cannot be accessed
							window.setTimeout( function() {
								if ( callback ) {
									errorCallback();
								}
							} );
						}
					};
				}

				// Create the abort callback
				callback = callback( "abort" );

				try {

					// Do send the request (this may raise an exception)
					xhr.send( options.hasContent && options.data || null );
				} catch ( e ) {

					// #14683: Only rethrow if this hasn't been notified as an error yet
					if ( callback ) {
						throw e;
					}
				}
			},

			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




// Install script dataType
jQuery.ajaxSetup( {
	accepts: {
		script: "text/javascript, application/javascript, " +
			"application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /\b(?:java|ecma)script\b/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
} );

// Handle cache's special case and crossDomain
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
	}
} );

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {
		var script, callback;
		return {
			send: function( _, complete ) {
				script = jQuery( "<script>" ).prop( {
					charset: s.scriptCharset,
					src: s.url
				} ).on(
					"load error",
					callback = function( evt ) {
						script.remove();
						callback = null;
						if ( evt ) {
							complete( evt.type === "error" ? 404 : 200, evt.type );
						}
					}
				);

				// Use native DOM manipulation to avoid our domManip AJAX trickery
				document.head.appendChild( script[ 0 ] );
			},
			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup( {
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
} );

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" &&
				( s.contentType || "" )
					.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
				rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters[ "script json" ] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// Force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always( function() {

			// If previous value didn't exist - remove it
			if ( overwritten === undefined ) {
				jQuery( window ).removeProp( callbackName );

			// Otherwise restore preexisting value
			} else {
				window[ callbackName ] = overwritten;
			}

			// Save back as free
			if ( s[ callbackName ] ) {

				// Make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// Save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		} );

		// Delegate to script
		return "script";
	}
} );




// Argument "data" should be string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}
	context = context || document;

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[ 1 ] ) ];
	}

	parsed = buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, type, response,
		self = this,
		off = url.indexOf( " " );

	if ( off > -1 ) {
		selector = jQuery.trim( url.slice( off ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax( {
			url: url,

			// If "type" variable is undefined, then "GET" method will be used.
			// Make value of this field explicit since
			// user can override it through ajaxSetup method
			type: type || "GET",
			dataType: "html",
			data: params
		} ).done( function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		// If the request succeeds, this function gets "data", "status", "jqXHR"
		// but they are ignored because response was set above.
		// If it fails, this function gets "jqXHR", "status", "error"
		} ).always( callback && function( jqXHR, status ) {
			self.each( function() {
				callback.apply( self, response || [ jqXHR.responseText, status, jqXHR ] );
			} );
		} );
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [
	"ajaxStart",
	"ajaxStop",
	"ajaxComplete",
	"ajaxError",
	"ajaxSuccess",
	"ajaxSend"
], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
} );




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep( jQuery.timers, function( fn ) {
		return elem === fn.elem;
	} ).length;
};




/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ? elem : elem.nodeType === 9 && elem.defaultView;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// Set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			( curCSSTop + curCSSLeft ).indexOf( "auto" ) > -1;

		// Need to be able to calculate position if either
		// top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;

		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {

			// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
			options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );

		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend( {
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each( function( i ) {
					jQuery.offset.setOffset( this, options, i );
				} );
		}

		var docElem, win,
			elem = this[ 0 ],
			box = { top: 0, left: 0 },
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		box = elem.getBoundingClientRect();
		win = getWindow( doc );
		return {
			top: box.top + win.pageYOffset - docElem.clientTop,
			left: box.left + win.pageXOffset - docElem.clientLeft
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			elem = this[ 0 ],
			parentOffset = { top: 0, left: 0 };

		// Fixed elements are offset from window (parentOffset = {top:0, left: 0},
		// because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {

			// Assume getBoundingClientRect is there when computed position is fixed
			offset = elem.getBoundingClientRect();

		} else {

			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		return {
			top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	// This method will return documentElement in the following cases:
	// 1) For the element inside the iframe without offsetParent, this method will return
	//    documentElement of the parent window
	// 2) For the hidden or detached element
	// 3) For body or html element, i.e. in case of the html node - it will return itself
	//
	// but those exceptions were never presented as a real life use-cases
	// and might be considered as more preferable results.
	//
	// This logic, however, is not guaranteed and can change at any point in the future
	offsetParent: function() {
		return this.map( function() {
			var offsetParent = this.offsetParent;

			while ( offsetParent && jQuery.css( offsetParent, "position" ) === "static" ) {
				offsetParent = offsetParent.offsetParent;
			}

			return offsetParent || documentElement;
		} );
	}
} );

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = "pageYOffset" === prop;

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? win[ prop ] : elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : win.pageXOffset,
					top ? val : win.pageYOffset
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length );
	};
} );

// Support: Safari<7-8+, Chrome<37-44+
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// Blink bug: https://code.google.com/p/chromium/issues/detail?id=229280
// getComputedStyle returns percent when specified for top/left/bottom/right;
// rather than make the css module depend on the offset module, just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );

				// If curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
} );


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
		function( defaultExtra, funcName ) {

		// Margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {

					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	} );
} );


jQuery.fn.extend( {

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {

		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ?
			this.off( selector, "**" ) :
			this.off( types, selector || "**", fn );
	},
	size: function() {
		return this.length;
	}
} );

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	} );
}



var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in AMD
// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( !noGlobal ) {
	window.jQuery = window.$ = jQuery;
}

return jQuery;
}));

/*!
 * Bootstrap v3.3.6 (http://getbootstrap.com)
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under the MIT license
 */

if (typeof jQuery === 'undefined') {
  throw new Error('Bootstrap\'s JavaScript requires jQuery')
}

+function ($) {
  'use strict';
  var version = $.fn.jquery.split(' ')[0].split('.')
  if ((version[0] < 2 && version[1] < 9) || (version[0] == 1 && version[1] == 9 && version[2] < 1) || (version[0] > 2)) {
    throw new Error('Bootstrap\'s JavaScript requires jQuery version 1.9.1 or higher, but lower than version 3')
  }
}(jQuery);

/* ========================================================================
 * Bootstrap: transition.js v3.3.6
 * http://getbootstrap.com/javascript/#transitions
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // CSS TRANSITION SUPPORT (Shoutout: http://www.modernizr.com/)
  // ============================================================

  function transitionEnd() {
    var el = document.createElement('bootstrap')

    var transEndEventNames = {
      WebkitTransition : 'webkitTransitionEnd',
      MozTransition    : 'transitionend',
      OTransition      : 'oTransitionEnd otransitionend',
      transition       : 'transitionend'
    }

    for (var name in transEndEventNames) {
      if (el.style[name] !== undefined) {
        return { end: transEndEventNames[name] }
      }
    }

    return false // explicit for ie8 (  ._.)
  }

  // http://blog.alexmaccaw.com/css-transitions
  $.fn.emulateTransitionEnd = function (duration) {
    var called = false
    var $el = this
    $(this).one('bsTransitionEnd', function () { called = true })
    var callback = function () { if (!called) $($el).trigger($.support.transition.end) }
    setTimeout(callback, duration)
    return this
  }

  $(function () {
    $.support.transition = transitionEnd()

    if (!$.support.transition) return

    $.event.special.bsTransitionEnd = {
      bindType: $.support.transition.end,
      delegateType: $.support.transition.end,
      handle: function (e) {
        if ($(e.target).is(this)) return e.handleObj.handler.apply(this, arguments)
      }
    }
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: alert.js v3.3.6
 * http://getbootstrap.com/javascript/#alerts
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // ALERT CLASS DEFINITION
  // ======================

  var dismiss = '[data-dismiss="alert"]'
  var Alert   = function (el) {
    $(el).on('click', dismiss, this.close)
  }

  Alert.VERSION = '3.3.6'

  Alert.TRANSITION_DURATION = 150

  Alert.prototype.close = function (e) {
    var $this    = $(this)
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = $(selector)

    if (e) e.preventDefault()

    if (!$parent.length) {
      $parent = $this.closest('.alert')
    }

    $parent.trigger(e = $.Event('close.bs.alert'))

    if (e.isDefaultPrevented()) return

    $parent.removeClass('in')

    function removeElement() {
      // detach from parent, fire event then clean up data
      $parent.detach().trigger('closed.bs.alert').remove()
    }

    $.support.transition && $parent.hasClass('fade') ?
      $parent
        .one('bsTransitionEnd', removeElement)
        .emulateTransitionEnd(Alert.TRANSITION_DURATION) :
      removeElement()
  }


  // ALERT PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.alert')

      if (!data) $this.data('bs.alert', (data = new Alert(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  var old = $.fn.alert

  $.fn.alert             = Plugin
  $.fn.alert.Constructor = Alert


  // ALERT NO CONFLICT
  // =================

  $.fn.alert.noConflict = function () {
    $.fn.alert = old
    return this
  }


  // ALERT DATA-API
  // ==============

  $(document).on('click.bs.alert.data-api', dismiss, Alert.prototype.close)

}(jQuery);

/* ========================================================================
 * Bootstrap: button.js v3.3.6
 * http://getbootstrap.com/javascript/#buttons
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // BUTTON PUBLIC CLASS DEFINITION
  // ==============================

  var Button = function (element, options) {
    this.$element  = $(element)
    this.options   = $.extend({}, Button.DEFAULTS, options)
    this.isLoading = false
  }

  Button.VERSION  = '3.3.6'

  Button.DEFAULTS = {
    loadingText: 'loading...'
  }

  Button.prototype.setState = function (state) {
    var d    = 'disabled'
    var $el  = this.$element
    var val  = $el.is('input') ? 'val' : 'html'
    var data = $el.data()

    state += 'Text'

    if (data.resetText == null) $el.data('resetText', $el[val]())

    // push to event loop to allow forms to submit
    setTimeout($.proxy(function () {
      $el[val](data[state] == null ? this.options[state] : data[state])

      if (state == 'loadingText') {
        this.isLoading = true
        $el.addClass(d).attr(d, d)
      } else if (this.isLoading) {
        this.isLoading = false
        $el.removeClass(d).removeAttr(d)
      }
    }, this), 0)
  }

  Button.prototype.toggle = function () {
    var changed = true
    var $parent = this.$element.closest('[data-toggle="buttons"]')

    if ($parent.length) {
      var $input = this.$element.find('input')
      if ($input.prop('type') == 'radio') {
        if ($input.prop('checked')) changed = false
        $parent.find('.active').removeClass('active')
        this.$element.addClass('active')
      } else if ($input.prop('type') == 'checkbox') {
        if (($input.prop('checked')) !== this.$element.hasClass('active')) changed = false
        this.$element.toggleClass('active')
      }
      $input.prop('checked', this.$element.hasClass('active'))
      if (changed) $input.trigger('change')
    } else {
      this.$element.attr('aria-pressed', !this.$element.hasClass('active'))
      this.$element.toggleClass('active')
    }
  }


  // BUTTON PLUGIN DEFINITION
  // ========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.button')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.button', (data = new Button(this, options)))

      if (option == 'toggle') data.toggle()
      else if (option) data.setState(option)
    })
  }

  var old = $.fn.button

  $.fn.button             = Plugin
  $.fn.button.Constructor = Button


  // BUTTON NO CONFLICT
  // ==================

  $.fn.button.noConflict = function () {
    $.fn.button = old
    return this
  }


  // BUTTON DATA-API
  // ===============

  $(document)
    .on('click.bs.button.data-api', '[data-toggle^="button"]', function (e) {
      var $btn = $(e.target)
      if (!$btn.hasClass('btn')) $btn = $btn.closest('.btn')
      Plugin.call($btn, 'toggle')
      if (!($(e.target).is('input[type="radio"]') || $(e.target).is('input[type="checkbox"]'))) e.preventDefault()
    })
    .on('focus.bs.button.data-api blur.bs.button.data-api', '[data-toggle^="button"]', function (e) {
      $(e.target).closest('.btn').toggleClass('focus', /^focus(in)?$/.test(e.type))
    })

}(jQuery);

/* ========================================================================
 * Bootstrap: carousel.js v3.3.6
 * http://getbootstrap.com/javascript/#carousel
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // CAROUSEL CLASS DEFINITION
  // =========================

  var Carousel = function (element, options) {
    this.$element    = $(element)
    this.$indicators = this.$element.find('.carousel-indicators')
    this.options     = options
    this.paused      = null
    this.sliding     = null
    this.interval    = null
    this.$active     = null
    this.$items      = null

    this.options.keyboard && this.$element.on('keydown.bs.carousel', $.proxy(this.keydown, this))

    this.options.pause == 'hover' && !('ontouchstart' in document.documentElement) && this.$element
      .on('mouseenter.bs.carousel', $.proxy(this.pause, this))
      .on('mouseleave.bs.carousel', $.proxy(this.cycle, this))
  }

  Carousel.VERSION  = '3.3.6'

  Carousel.TRANSITION_DURATION = 600

  Carousel.DEFAULTS = {
    interval: 5000,
    pause: 'hover',
    wrap: true,
    keyboard: true
  }

  Carousel.prototype.keydown = function (e) {
    if (/input|textarea/i.test(e.target.tagName)) return
    switch (e.which) {
      case 37: this.prev(); break
      case 39: this.next(); break
      default: return
    }

    e.preventDefault()
  }

  Carousel.prototype.cycle = function (e) {
    e || (this.paused = false)

    this.interval && clearInterval(this.interval)

    this.options.interval
      && !this.paused
      && (this.interval = setInterval($.proxy(this.next, this), this.options.interval))

    return this
  }

  Carousel.prototype.getItemIndex = function (item) {
    this.$items = item.parent().children('.item')
    return this.$items.index(item || this.$active)
  }

  Carousel.prototype.getItemForDirection = function (direction, active) {
    var activeIndex = this.getItemIndex(active)
    var willWrap = (direction == 'prev' && activeIndex === 0)
                || (direction == 'next' && activeIndex == (this.$items.length - 1))
    if (willWrap && !this.options.wrap) return active
    var delta = direction == 'prev' ? -1 : 1
    var itemIndex = (activeIndex + delta) % this.$items.length
    return this.$items.eq(itemIndex)
  }

  Carousel.prototype.to = function (pos) {
    var that        = this
    var activeIndex = this.getItemIndex(this.$active = this.$element.find('.item.active'))

    if (pos > (this.$items.length - 1) || pos < 0) return

    if (this.sliding)       return this.$element.one('slid.bs.carousel', function () { that.to(pos) }) // yes, "slid"
    if (activeIndex == pos) return this.pause().cycle()

    return this.slide(pos > activeIndex ? 'next' : 'prev', this.$items.eq(pos))
  }

  Carousel.prototype.pause = function (e) {
    e || (this.paused = true)

    if (this.$element.find('.next, .prev').length && $.support.transition) {
      this.$element.trigger($.support.transition.end)
      this.cycle(true)
    }

    this.interval = clearInterval(this.interval)

    return this
  }

  Carousel.prototype.next = function () {
    if (this.sliding) return
    return this.slide('next')
  }

  Carousel.prototype.prev = function () {
    if (this.sliding) return
    return this.slide('prev')
  }

  Carousel.prototype.slide = function (type, next) {
    var $active   = this.$element.find('.item.active')
    var $next     = next || this.getItemForDirection(type, $active)
    var isCycling = this.interval
    var direction = type == 'next' ? 'left' : 'right'
    var that      = this

    if ($next.hasClass('active')) return (this.sliding = false)

    var relatedTarget = $next[0]
    var slideEvent = $.Event('slide.bs.carousel', {
      relatedTarget: relatedTarget,
      direction: direction
    })
    this.$element.trigger(slideEvent)
    if (slideEvent.isDefaultPrevented()) return

    this.sliding = true

    isCycling && this.pause()

    if (this.$indicators.length) {
      this.$indicators.find('.active').removeClass('active')
      var $nextIndicator = $(this.$indicators.children()[this.getItemIndex($next)])
      $nextIndicator && $nextIndicator.addClass('active')
    }

    var slidEvent = $.Event('slid.bs.carousel', { relatedTarget: relatedTarget, direction: direction }) // yes, "slid"
    if ($.support.transition && this.$element.hasClass('slide')) {
      $next.addClass(type)
      $next[0].offsetWidth // force reflow
      $active.addClass(direction)
      $next.addClass(direction)
      $active
        .one('bsTransitionEnd', function () {
          $next.removeClass([type, direction].join(' ')).addClass('active')
          $active.removeClass(['active', direction].join(' '))
          that.sliding = false
          setTimeout(function () {
            that.$element.trigger(slidEvent)
          }, 0)
        })
        .emulateTransitionEnd(Carousel.TRANSITION_DURATION)
    } else {
      $active.removeClass('active')
      $next.addClass('active')
      this.sliding = false
      this.$element.trigger(slidEvent)
    }

    isCycling && this.cycle()

    return this
  }


  // CAROUSEL PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.carousel')
      var options = $.extend({}, Carousel.DEFAULTS, $this.data(), typeof option == 'object' && option)
      var action  = typeof option == 'string' ? option : options.slide

      if (!data) $this.data('bs.carousel', (data = new Carousel(this, options)))
      if (typeof option == 'number') data.to(option)
      else if (action) data[action]()
      else if (options.interval) data.pause().cycle()
    })
  }

  var old = $.fn.carousel

  $.fn.carousel             = Plugin
  $.fn.carousel.Constructor = Carousel


  // CAROUSEL NO CONFLICT
  // ====================

  $.fn.carousel.noConflict = function () {
    $.fn.carousel = old
    return this
  }


  // CAROUSEL DATA-API
  // =================

  var clickHandler = function (e) {
    var href
    var $this   = $(this)
    var $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) // strip for ie7
    if (!$target.hasClass('carousel')) return
    var options = $.extend({}, $target.data(), $this.data())
    var slideIndex = $this.attr('data-slide-to')
    if (slideIndex) options.interval = false

    Plugin.call($target, options)

    if (slideIndex) {
      $target.data('bs.carousel').to(slideIndex)
    }

    e.preventDefault()
  }

  $(document)
    .on('click.bs.carousel.data-api', '[data-slide]', clickHandler)
    .on('click.bs.carousel.data-api', '[data-slide-to]', clickHandler)

  $(window).on('load', function () {
    $('[data-ride="carousel"]').each(function () {
      var $carousel = $(this)
      Plugin.call($carousel, $carousel.data())
    })
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: collapse.js v3.3.6
 * http://getbootstrap.com/javascript/#collapse
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // COLLAPSE PUBLIC CLASS DEFINITION
  // ================================

  var Collapse = function (element, options) {
    this.$element      = $(element)
    this.options       = $.extend({}, Collapse.DEFAULTS, options)
    this.$trigger      = $('[data-toggle="collapse"][href="#' + element.id + '"],' +
                           '[data-toggle="collapse"][data-target="#' + element.id + '"]')
    this.transitioning = null

    if (this.options.parent) {
      this.$parent = this.getParent()
    } else {
      this.addAriaAndCollapsedClass(this.$element, this.$trigger)
    }

    if (this.options.toggle) this.toggle()
  }

  Collapse.VERSION  = '3.3.6'

  Collapse.TRANSITION_DURATION = 350

  Collapse.DEFAULTS = {
    toggle: true
  }

  Collapse.prototype.dimension = function () {
    var hasWidth = this.$element.hasClass('width')
    return hasWidth ? 'width' : 'height'
  }

  Collapse.prototype.show = function () {
    if (this.transitioning || this.$element.hasClass('in')) return

    var activesData
    var actives = this.$parent && this.$parent.children('.panel').children('.in, .collapsing')

    if (actives && actives.length) {
      activesData = actives.data('bs.collapse')
      if (activesData && activesData.transitioning) return
    }

    var startEvent = $.Event('show.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    if (actives && actives.length) {
      Plugin.call(actives, 'hide')
      activesData || actives.data('bs.collapse', null)
    }

    var dimension = this.dimension()

    this.$element
      .removeClass('collapse')
      .addClass('collapsing')[dimension](0)
      .attr('aria-expanded', true)

    this.$trigger
      .removeClass('collapsed')
      .attr('aria-expanded', true)

    this.transitioning = 1

    var complete = function () {
      this.$element
        .removeClass('collapsing')
        .addClass('collapse in')[dimension]('')
      this.transitioning = 0
      this.$element
        .trigger('shown.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    var scrollSize = $.camelCase(['scroll', dimension].join('-'))

    this.$element
      .one('bsTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(Collapse.TRANSITION_DURATION)[dimension](this.$element[0][scrollSize])
  }

  Collapse.prototype.hide = function () {
    if (this.transitioning || !this.$element.hasClass('in')) return

    var startEvent = $.Event('hide.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    var dimension = this.dimension()

    this.$element[dimension](this.$element[dimension]())[0].offsetHeight

    this.$element
      .addClass('collapsing')
      .removeClass('collapse in')
      .attr('aria-expanded', false)

    this.$trigger
      .addClass('collapsed')
      .attr('aria-expanded', false)

    this.transitioning = 1

    var complete = function () {
      this.transitioning = 0
      this.$element
        .removeClass('collapsing')
        .addClass('collapse')
        .trigger('hidden.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    this.$element
      [dimension](0)
      .one('bsTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(Collapse.TRANSITION_DURATION)
  }

  Collapse.prototype.toggle = function () {
    this[this.$element.hasClass('in') ? 'hide' : 'show']()
  }

  Collapse.prototype.getParent = function () {
    return $(this.options.parent)
      .find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]')
      .each($.proxy(function (i, element) {
        var $element = $(element)
        this.addAriaAndCollapsedClass(getTargetFromTrigger($element), $element)
      }, this))
      .end()
  }

  Collapse.prototype.addAriaAndCollapsedClass = function ($element, $trigger) {
    var isOpen = $element.hasClass('in')

    $element.attr('aria-expanded', isOpen)
    $trigger
      .toggleClass('collapsed', !isOpen)
      .attr('aria-expanded', isOpen)
  }

  function getTargetFromTrigger($trigger) {
    var href
    var target = $trigger.attr('data-target')
      || (href = $trigger.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') // strip for ie7

    return $(target)
  }


  // COLLAPSE PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.collapse')
      var options = $.extend({}, Collapse.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data && options.toggle && /show|hide/.test(option)) options.toggle = false
      if (!data) $this.data('bs.collapse', (data = new Collapse(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.collapse

  $.fn.collapse             = Plugin
  $.fn.collapse.Constructor = Collapse


  // COLLAPSE NO CONFLICT
  // ====================

  $.fn.collapse.noConflict = function () {
    $.fn.collapse = old
    return this
  }


  // COLLAPSE DATA-API
  // =================

  $(document).on('click.bs.collapse.data-api', '[data-toggle="collapse"]', function (e) {
    var $this   = $(this)

    if (!$this.attr('data-target')) e.preventDefault()

    var $target = getTargetFromTrigger($this)
    var data    = $target.data('bs.collapse')
    var option  = data ? 'toggle' : $this.data()

    Plugin.call($target, option)
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: dropdown.js v3.3.6
 * http://getbootstrap.com/javascript/#dropdowns
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // DROPDOWN CLASS DEFINITION
  // =========================

  var backdrop = '.dropdown-backdrop'
  var toggle   = '[data-toggle="dropdown"]'
  var Dropdown = function (element) {
    $(element).on('click.bs.dropdown', this.toggle)
  }

  Dropdown.VERSION = '3.3.6'

  function getParent($this) {
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = selector && $(selector)

    return $parent && $parent.length ? $parent : $this.parent()
  }

  function clearMenus(e) {
    if (e && e.which === 3) return
    $(backdrop).remove()
    $(toggle).each(function () {
      var $this         = $(this)
      var $parent       = getParent($this)
      var relatedTarget = { relatedTarget: this }

      if (!$parent.hasClass('open')) return

      if (e && e.type == 'click' && /input|textarea/i.test(e.target.tagName) && $.contains($parent[0], e.target)) return

      $parent.trigger(e = $.Event('hide.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $this.attr('aria-expanded', 'false')
      $parent.removeClass('open').trigger($.Event('hidden.bs.dropdown', relatedTarget))
    })
  }

  Dropdown.prototype.toggle = function (e) {
    var $this = $(this)

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    clearMenus()

    if (!isActive) {
      if ('ontouchstart' in document.documentElement && !$parent.closest('.navbar-nav').length) {
        // if mobile we use a backdrop because click events don't delegate
        $(document.createElement('div'))
          .addClass('dropdown-backdrop')
          .insertAfter($(this))
          .on('click', clearMenus)
      }

      var relatedTarget = { relatedTarget: this }
      $parent.trigger(e = $.Event('show.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $this
        .trigger('focus')
        .attr('aria-expanded', 'true')

      $parent
        .toggleClass('open')
        .trigger($.Event('shown.bs.dropdown', relatedTarget))
    }

    return false
  }

  Dropdown.prototype.keydown = function (e) {
    if (!/(38|40|27|32)/.test(e.which) || /input|textarea/i.test(e.target.tagName)) return

    var $this = $(this)

    e.preventDefault()
    e.stopPropagation()

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    if (!isActive && e.which != 27 || isActive && e.which == 27) {
      if (e.which == 27) $parent.find(toggle).trigger('focus')
      return $this.trigger('click')
    }

    var desc = ' li:not(.disabled):visible a'
    var $items = $parent.find('.dropdown-menu' + desc)

    if (!$items.length) return

    var index = $items.index(e.target)

    if (e.which == 38 && index > 0)                 index--         // up
    if (e.which == 40 && index < $items.length - 1) index++         // down
    if (!~index)                                    index = 0

    $items.eq(index).trigger('focus')
  }


  // DROPDOWN PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.dropdown')

      if (!data) $this.data('bs.dropdown', (data = new Dropdown(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  var old = $.fn.dropdown

  $.fn.dropdown             = Plugin
  $.fn.dropdown.Constructor = Dropdown


  // DROPDOWN NO CONFLICT
  // ====================

  $.fn.dropdown.noConflict = function () {
    $.fn.dropdown = old
    return this
  }


  // APPLY TO STANDARD DROPDOWN ELEMENTS
  // ===================================

  $(document)
    .on('click.bs.dropdown.data-api', clearMenus)
    .on('click.bs.dropdown.data-api', '.dropdown form', function (e) { e.stopPropagation() })
    .on('click.bs.dropdown.data-api', toggle, Dropdown.prototype.toggle)
    .on('keydown.bs.dropdown.data-api', toggle, Dropdown.prototype.keydown)
    .on('keydown.bs.dropdown.data-api', '.dropdown-menu', Dropdown.prototype.keydown)

}(jQuery);

/* ========================================================================
 * Bootstrap: modal.js v3.3.6
 * http://getbootstrap.com/javascript/#modals
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // MODAL CLASS DEFINITION
  // ======================

  var Modal = function (element, options) {
    this.options             = options
    this.$body               = $(document.body)
    this.$element            = $(element)
    this.$dialog             = this.$element.find('.modal-dialog')
    this.$backdrop           = null
    this.isShown             = null
    this.originalBodyPad     = null
    this.scrollbarWidth      = 0
    this.ignoreBackdropClick = false

    if (this.options.remote) {
      this.$element
        .find('.modal-content')
        .load(this.options.remote, $.proxy(function () {
          this.$element.trigger('loaded.bs.modal')
        }, this))
    }
  }

  Modal.VERSION  = '3.3.6'

  Modal.TRANSITION_DURATION = 300
  Modal.BACKDROP_TRANSITION_DURATION = 150

  Modal.DEFAULTS = {
    backdrop: true,
    keyboard: true,
    show: true
  }

  Modal.prototype.toggle = function (_relatedTarget) {
    return this.isShown ? this.hide() : this.show(_relatedTarget)
  }

  Modal.prototype.show = function (_relatedTarget) {
    var that = this
    var e    = $.Event('show.bs.modal', { relatedTarget: _relatedTarget })

    this.$element.trigger(e)

    if (this.isShown || e.isDefaultPrevented()) return

    this.isShown = true

    this.checkScrollbar()
    this.setScrollbar()
    this.$body.addClass('modal-open')

    this.escape()
    this.resize()

    this.$element.on('click.dismiss.bs.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this))

    this.$dialog.on('mousedown.dismiss.bs.modal', function () {
      that.$element.one('mouseup.dismiss.bs.modal', function (e) {
        if ($(e.target).is(that.$element)) that.ignoreBackdropClick = true
      })
    })

    this.backdrop(function () {
      var transition = $.support.transition && that.$element.hasClass('fade')

      if (!that.$element.parent().length) {
        that.$element.appendTo(that.$body) // don't move modals dom position
      }

      that.$element
        .show()
        .scrollTop(0)

      that.adjustDialog()

      if (transition) {
        that.$element[0].offsetWidth // force reflow
      }

      that.$element.addClass('in')

      that.enforceFocus()

      var e = $.Event('shown.bs.modal', { relatedTarget: _relatedTarget })

      transition ?
        that.$dialog // wait for modal to slide in
          .one('bsTransitionEnd', function () {
            that.$element.trigger('focus').trigger(e)
          })
          .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
        that.$element.trigger('focus').trigger(e)
    })
  }

  Modal.prototype.hide = function (e) {
    if (e) e.preventDefault()

    e = $.Event('hide.bs.modal')

    this.$element.trigger(e)

    if (!this.isShown || e.isDefaultPrevented()) return

    this.isShown = false

    this.escape()
    this.resize()

    $(document).off('focusin.bs.modal')

    this.$element
      .removeClass('in')
      .off('click.dismiss.bs.modal')
      .off('mouseup.dismiss.bs.modal')

    this.$dialog.off('mousedown.dismiss.bs.modal')

    $.support.transition && this.$element.hasClass('fade') ?
      this.$element
        .one('bsTransitionEnd', $.proxy(this.hideModal, this))
        .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
      this.hideModal()
  }

  Modal.prototype.enforceFocus = function () {
    $(document)
      .off('focusin.bs.modal') // guard against infinite focus loop
      .on('focusin.bs.modal', $.proxy(function (e) {
        if (this.$element[0] !== e.target && !this.$element.has(e.target).length) {
          this.$element.trigger('focus')
        }
      }, this))
  }

  Modal.prototype.escape = function () {
    if (this.isShown && this.options.keyboard) {
      this.$element.on('keydown.dismiss.bs.modal', $.proxy(function (e) {
        e.which == 27 && this.hide()
      }, this))
    } else if (!this.isShown) {
      this.$element.off('keydown.dismiss.bs.modal')
    }
  }

  Modal.prototype.resize = function () {
    if (this.isShown) {
      $(window).on('resize.bs.modal', $.proxy(this.handleUpdate, this))
    } else {
      $(window).off('resize.bs.modal')
    }
  }

  Modal.prototype.hideModal = function () {
    var that = this
    this.$element.hide()
    this.backdrop(function () {
      that.$body.removeClass('modal-open')
      that.resetAdjustments()
      that.resetScrollbar()
      that.$element.trigger('hidden.bs.modal')
    })
  }

  Modal.prototype.removeBackdrop = function () {
    this.$backdrop && this.$backdrop.remove()
    this.$backdrop = null
  }

  Modal.prototype.backdrop = function (callback) {
    var that = this
    var animate = this.$element.hasClass('fade') ? 'fade' : ''

    if (this.isShown && this.options.backdrop) {
      var doAnimate = $.support.transition && animate

      this.$backdrop = $(document.createElement('div'))
        .addClass('modal-backdrop ' + animate)
        .appendTo(this.$body)

      this.$element.on('click.dismiss.bs.modal', $.proxy(function (e) {
        if (this.ignoreBackdropClick) {
          this.ignoreBackdropClick = false
          return
        }
        if (e.target !== e.currentTarget) return
        this.options.backdrop == 'static'
          ? this.$element[0].focus()
          : this.hide()
      }, this))

      if (doAnimate) this.$backdrop[0].offsetWidth // force reflow

      this.$backdrop.addClass('in')

      if (!callback) return

      doAnimate ?
        this.$backdrop
          .one('bsTransitionEnd', callback)
          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
        callback()

    } else if (!this.isShown && this.$backdrop) {
      this.$backdrop.removeClass('in')

      var callbackRemove = function () {
        that.removeBackdrop()
        callback && callback()
      }
      $.support.transition && this.$element.hasClass('fade') ?
        this.$backdrop
          .one('bsTransitionEnd', callbackRemove)
          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
        callbackRemove()

    } else if (callback) {
      callback()
    }
  }

  // these following methods are used to handle overflowing modals

  Modal.prototype.handleUpdate = function () {
    this.adjustDialog()
  }

  Modal.prototype.adjustDialog = function () {
    var modalIsOverflowing = this.$element[0].scrollHeight > document.documentElement.clientHeight

    this.$element.css({
      paddingLeft:  !this.bodyIsOverflowing && modalIsOverflowing ? this.scrollbarWidth : '',
      paddingRight: this.bodyIsOverflowing && !modalIsOverflowing ? this.scrollbarWidth : ''
    })
  }

  Modal.prototype.resetAdjustments = function () {
    this.$element.css({
      paddingLeft: '',
      paddingRight: ''
    })
  }

  Modal.prototype.checkScrollbar = function () {
    var fullWindowWidth = window.innerWidth
    if (!fullWindowWidth) { // workaround for missing window.innerWidth in IE8
      var documentElementRect = document.documentElement.getBoundingClientRect()
      fullWindowWidth = documentElementRect.right - Math.abs(documentElementRect.left)
    }
    this.bodyIsOverflowing = document.body.clientWidth < fullWindowWidth
    this.scrollbarWidth = this.measureScrollbar()
  }

  Modal.prototype.setScrollbar = function () {
    var bodyPad = parseInt((this.$body.css('padding-right') || 0), 10)
    this.originalBodyPad = document.body.style.paddingRight || ''
    if (this.bodyIsOverflowing) this.$body.css('padding-right', bodyPad + this.scrollbarWidth)
  }

  Modal.prototype.resetScrollbar = function () {
    this.$body.css('padding-right', this.originalBodyPad)
  }

  Modal.prototype.measureScrollbar = function () { // thx walsh
    var scrollDiv = document.createElement('div')
    scrollDiv.className = 'modal-scrollbar-measure'
    this.$body.append(scrollDiv)
    var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth
    this.$body[0].removeChild(scrollDiv)
    return scrollbarWidth
  }


  // MODAL PLUGIN DEFINITION
  // =======================

  function Plugin(option, _relatedTarget) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.modal')
      var options = $.extend({}, Modal.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data) $this.data('bs.modal', (data = new Modal(this, options)))
      if (typeof option == 'string') data[option](_relatedTarget)
      else if (options.show) data.show(_relatedTarget)
    })
  }

  var old = $.fn.modal

  $.fn.modal             = Plugin
  $.fn.modal.Constructor = Modal


  // MODAL NO CONFLICT
  // =================

  $.fn.modal.noConflict = function () {
    $.fn.modal = old
    return this
  }


  // MODAL DATA-API
  // ==============

  $(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function (e) {
    var $this   = $(this)
    var href    = $this.attr('href')
    var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) // strip for ie7
    var option  = $target.data('bs.modal') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data())

    if ($this.is('a')) e.preventDefault()

    $target.one('show.bs.modal', function (showEvent) {
      if (showEvent.isDefaultPrevented()) return // only register focus restorer if modal will actually get shown
      $target.one('hidden.bs.modal', function () {
        $this.is(':visible') && $this.trigger('focus')
      })
    })
    Plugin.call($target, option, this)
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: tooltip.js v3.3.6
 * http://getbootstrap.com/javascript/#tooltip
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // TOOLTIP PUBLIC CLASS DEFINITION
  // ===============================

  var Tooltip = function (element, options) {
    this.type       = null
    this.options    = null
    this.enabled    = null
    this.timeout    = null
    this.hoverState = null
    this.$element   = null
    this.inState    = null

    this.init('tooltip', element, options)
  }

  Tooltip.VERSION  = '3.3.6'

  Tooltip.TRANSITION_DURATION = 150

  Tooltip.DEFAULTS = {
    animation: true,
    placement: 'top',
    selector: false,
    template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
    trigger: 'hover focus',
    title: '',
    delay: 0,
    html: false,
    container: false,
    viewport: {
      selector: 'body',
      padding: 0
    }
  }

  Tooltip.prototype.init = function (type, element, options) {
    this.enabled   = true
    this.type      = type
    this.$element  = $(element)
    this.options   = this.getOptions(options)
    this.$viewport = this.options.viewport && $($.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : (this.options.viewport.selector || this.options.viewport))
    this.inState   = { click: false, hover: false, focus: false }

    if (this.$element[0] instanceof document.constructor && !this.options.selector) {
      throw new Error('`selector` option must be specified when initializing ' + this.type + ' on the window.document object!')
    }

    var triggers = this.options.trigger.split(' ')

    for (var i = triggers.length; i--;) {
      var trigger = triggers[i]

      if (trigger == 'click') {
        this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this))
      } else if (trigger != 'manual') {
        var eventIn  = trigger == 'hover' ? 'mouseenter' : 'focusin'
        var eventOut = trigger == 'hover' ? 'mouseleave' : 'focusout'

        this.$element.on(eventIn  + '.' + this.type, this.options.selector, $.proxy(this.enter, this))
        this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this))
      }
    }

    this.options.selector ?
      (this._options = $.extend({}, this.options, { trigger: 'manual', selector: '' })) :
      this.fixTitle()
  }

  Tooltip.prototype.getDefaults = function () {
    return Tooltip.DEFAULTS
  }

  Tooltip.prototype.getOptions = function (options) {
    options = $.extend({}, this.getDefaults(), this.$element.data(), options)

    if (options.delay && typeof options.delay == 'number') {
      options.delay = {
        show: options.delay,
        hide: options.delay
      }
    }

    return options
  }

  Tooltip.prototype.getDelegateOptions = function () {
    var options  = {}
    var defaults = this.getDefaults()

    this._options && $.each(this._options, function (key, value) {
      if (defaults[key] != value) options[key] = value
    })

    return options
  }

  Tooltip.prototype.enter = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget).data('bs.' + this.type)

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
      $(obj.currentTarget).data('bs.' + this.type, self)
    }

    if (obj instanceof $.Event) {
      self.inState[obj.type == 'focusin' ? 'focus' : 'hover'] = true
    }

    if (self.tip().hasClass('in') || self.hoverState == 'in') {
      self.hoverState = 'in'
      return
    }

    clearTimeout(self.timeout)

    self.hoverState = 'in'

    if (!self.options.delay || !self.options.delay.show) return self.show()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'in') self.show()
    }, self.options.delay.show)
  }

  Tooltip.prototype.isInStateTrue = function () {
    for (var key in this.inState) {
      if (this.inState[key]) return true
    }

    return false
  }

  Tooltip.prototype.leave = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget).data('bs.' + this.type)

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
      $(obj.currentTarget).data('bs.' + this.type, self)
    }

    if (obj instanceof $.Event) {
      self.inState[obj.type == 'focusout' ? 'focus' : 'hover'] = false
    }

    if (self.isInStateTrue()) return

    clearTimeout(self.timeout)

    self.hoverState = 'out'

    if (!self.options.delay || !self.options.delay.hide) return self.hide()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'out') self.hide()
    }, self.options.delay.hide)
  }

  Tooltip.prototype.show = function () {
    var e = $.Event('show.bs.' + this.type)

    if (this.hasContent() && this.enabled) {
      this.$element.trigger(e)

      var inDom = $.contains(this.$element[0].ownerDocument.documentElement, this.$element[0])
      if (e.isDefaultPrevented() || !inDom) return
      var that = this

      var $tip = this.tip()

      var tipId = this.getUID(this.type)

      this.setContent()
      $tip.attr('id', tipId)
      this.$element.attr('aria-describedby', tipId)

      if (this.options.animation) $tip.addClass('fade')

      var placement = typeof this.options.placement == 'function' ?
        this.options.placement.call(this, $tip[0], this.$element[0]) :
        this.options.placement

      var autoToken = /\s?auto?\s?/i
      var autoPlace = autoToken.test(placement)
      if (autoPlace) placement = placement.replace(autoToken, '') || 'top'

      $tip
        .detach()
        .css({ top: 0, left: 0, display: 'block' })
        .addClass(placement)
        .data('bs.' + this.type, this)

      this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element)
      this.$element.trigger('inserted.bs.' + this.type)

      var pos          = this.getPosition()
      var actualWidth  = $tip[0].offsetWidth
      var actualHeight = $tip[0].offsetHeight

      if (autoPlace) {
        var orgPlacement = placement
        var viewportDim = this.getPosition(this.$viewport)

        placement = placement == 'bottom' && pos.bottom + actualHeight > viewportDim.bottom ? 'top'    :
                    placement == 'top'    && pos.top    - actualHeight < viewportDim.top    ? 'bottom' :
                    placement == 'right'  && pos.right  + actualWidth  > viewportDim.width  ? 'left'   :
                    placement == 'left'   && pos.left   - actualWidth  < viewportDim.left   ? 'right'  :
                    placement

        $tip
          .removeClass(orgPlacement)
          .addClass(placement)
      }

      var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight)

      this.applyPlacement(calculatedOffset, placement)

      var complete = function () {
        var prevHoverState = that.hoverState
        that.$element.trigger('shown.bs.' + that.type)
        that.hoverState = null

        if (prevHoverState == 'out') that.leave(that)
      }

      $.support.transition && this.$tip.hasClass('fade') ?
        $tip
          .one('bsTransitionEnd', complete)
          .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
        complete()
    }
  }

  Tooltip.prototype.applyPlacement = function (offset, placement) {
    var $tip   = this.tip()
    var width  = $tip[0].offsetWidth
    var height = $tip[0].offsetHeight

    // manually read margins because getBoundingClientRect includes difference
    var marginTop = parseInt($tip.css('margin-top'), 10)
    var marginLeft = parseInt($tip.css('margin-left'), 10)

    // we must check for NaN for ie 8/9
    if (isNaN(marginTop))  marginTop  = 0
    if (isNaN(marginLeft)) marginLeft = 0

    offset.top  += marginTop
    offset.left += marginLeft

    // $.fn.offset doesn't round pixel values
    // so we use setOffset directly with our own function B-0
    $.offset.setOffset($tip[0], $.extend({
      using: function (props) {
        $tip.css({
          top: Math.round(props.top),
          left: Math.round(props.left)
        })
      }
    }, offset), 0)

    $tip.addClass('in')

    // check to see if placing tip in new offset caused the tip to resize itself
    var actualWidth  = $tip[0].offsetWidth
    var actualHeight = $tip[0].offsetHeight

    if (placement == 'top' && actualHeight != height) {
      offset.top = offset.top + height - actualHeight
    }

    var delta = this.getViewportAdjustedDelta(placement, offset, actualWidth, actualHeight)

    if (delta.left) offset.left += delta.left
    else offset.top += delta.top

    var isVertical          = /top|bottom/.test(placement)
    var arrowDelta          = isVertical ? delta.left * 2 - width + actualWidth : delta.top * 2 - height + actualHeight
    var arrowOffsetPosition = isVertical ? 'offsetWidth' : 'offsetHeight'

    $tip.offset(offset)
    this.replaceArrow(arrowDelta, $tip[0][arrowOffsetPosition], isVertical)
  }

  Tooltip.prototype.replaceArrow = function (delta, dimension, isVertical) {
    this.arrow()
      .css(isVertical ? 'left' : 'top', 50 * (1 - delta / dimension) + '%')
      .css(isVertical ? 'top' : 'left', '')
  }

  Tooltip.prototype.setContent = function () {
    var $tip  = this.tip()
    var title = this.getTitle()

    $tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title)
    $tip.removeClass('fade in top bottom left right')
  }

  Tooltip.prototype.hide = function (callback) {
    var that = this
    var $tip = $(this.$tip)
    var e    = $.Event('hide.bs.' + this.type)

    function complete() {
      if (that.hoverState != 'in') $tip.detach()
      that.$element
        .removeAttr('aria-describedby')
        .trigger('hidden.bs.' + that.type)
      callback && callback()
    }

    this.$element.trigger(e)

    if (e.isDefaultPrevented()) return

    $tip.removeClass('in')

    $.support.transition && $tip.hasClass('fade') ?
      $tip
        .one('bsTransitionEnd', complete)
        .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
      complete()

    this.hoverState = null

    return this
  }

  Tooltip.prototype.fixTitle = function () {
    var $e = this.$element
    if ($e.attr('title') || typeof $e.attr('data-original-title') != 'string') {
      $e.attr('data-original-title', $e.attr('title') || '').attr('title', '')
    }
  }

  Tooltip.prototype.hasContent = function () {
    return this.getTitle()
  }

  Tooltip.prototype.getPosition = function ($element) {
    $element   = $element || this.$element

    var el     = $element[0]
    var isBody = el.tagName == 'BODY'

    var elRect    = el.getBoundingClientRect()
    if (elRect.width == null) {
      // width and height are missing in IE8, so compute them manually; see https://github.com/twbs/bootstrap/issues/14093
      elRect = $.extend({}, elRect, { width: elRect.right - elRect.left, height: elRect.bottom - elRect.top })
    }
    var elOffset  = isBody ? { top: 0, left: 0 } : $element.offset()
    var scroll    = { scroll: isBody ? document.documentElement.scrollTop || document.body.scrollTop : $element.scrollTop() }
    var outerDims = isBody ? { width: $(window).width(), height: $(window).height() } : null

    return $.extend({}, elRect, scroll, outerDims, elOffset)
  }

  Tooltip.prototype.getCalculatedOffset = function (placement, pos, actualWidth, actualHeight) {
    return placement == 'bottom' ? { top: pos.top + pos.height,   left: pos.left + pos.width / 2 - actualWidth / 2 } :
           placement == 'top'    ? { top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2 } :
           placement == 'left'   ? { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth } :
        /* placement == 'right' */ { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width }

  }

  Tooltip.prototype.getViewportAdjustedDelta = function (placement, pos, actualWidth, actualHeight) {
    var delta = { top: 0, left: 0 }
    if (!this.$viewport) return delta

    var viewportPadding = this.options.viewport && this.options.viewport.padding || 0
    var viewportDimensions = this.getPosition(this.$viewport)

    if (/right|left/.test(placement)) {
      var topEdgeOffset    = pos.top - viewportPadding - viewportDimensions.scroll
      var bottomEdgeOffset = pos.top + viewportPadding - viewportDimensions.scroll + actualHeight
      if (topEdgeOffset < viewportDimensions.top) { // top overflow
        delta.top = viewportDimensions.top - topEdgeOffset
      } else if (bottomEdgeOffset > viewportDimensions.top + viewportDimensions.height) { // bottom overflow
        delta.top = viewportDimensions.top + viewportDimensions.height - bottomEdgeOffset
      }
    } else {
      var leftEdgeOffset  = pos.left - viewportPadding
      var rightEdgeOffset = pos.left + viewportPadding + actualWidth
      if (leftEdgeOffset < viewportDimensions.left) { // left overflow
        delta.left = viewportDimensions.left - leftEdgeOffset
      } else if (rightEdgeOffset > viewportDimensions.right) { // right overflow
        delta.left = viewportDimensions.left + viewportDimensions.width - rightEdgeOffset
      }
    }

    return delta
  }

  Tooltip.prototype.getTitle = function () {
    var title
    var $e = this.$element
    var o  = this.options

    title = $e.attr('data-original-title')
      || (typeof o.title == 'function' ? o.title.call($e[0]) :  o.title)

    return title
  }

  Tooltip.prototype.getUID = function (prefix) {
    do prefix += ~~(Math.random() * 1000000)
    while (document.getElementById(prefix))
    return prefix
  }

  Tooltip.prototype.tip = function () {
    if (!this.$tip) {
      this.$tip = $(this.options.template)
      if (this.$tip.length != 1) {
        throw new Error(this.type + ' `template` option must consist of exactly 1 top-level element!')
      }
    }
    return this.$tip
  }

  Tooltip.prototype.arrow = function () {
    return (this.$arrow = this.$arrow || this.tip().find('.tooltip-arrow'))
  }

  Tooltip.prototype.enable = function () {
    this.enabled = true
  }

  Tooltip.prototype.disable = function () {
    this.enabled = false
  }

  Tooltip.prototype.toggleEnabled = function () {
    this.enabled = !this.enabled
  }

  Tooltip.prototype.toggle = function (e) {
    var self = this
    if (e) {
      self = $(e.currentTarget).data('bs.' + this.type)
      if (!self) {
        self = new this.constructor(e.currentTarget, this.getDelegateOptions())
        $(e.currentTarget).data('bs.' + this.type, self)
      }
    }

    if (e) {
      self.inState.click = !self.inState.click
      if (self.isInStateTrue()) self.enter(self)
      else self.leave(self)
    } else {
      self.tip().hasClass('in') ? self.leave(self) : self.enter(self)
    }
  }

  Tooltip.prototype.destroy = function () {
    var that = this
    clearTimeout(this.timeout)
    this.hide(function () {
      that.$element.off('.' + that.type).removeData('bs.' + that.type)
      if (that.$tip) {
        that.$tip.detach()
      }
      that.$tip = null
      that.$arrow = null
      that.$viewport = null
    })
  }


  // TOOLTIP PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.tooltip')
      var options = typeof option == 'object' && option

      if (!data && /destroy|hide/.test(option)) return
      if (!data) $this.data('bs.tooltip', (data = new Tooltip(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.tooltip

  $.fn.tooltip             = Plugin
  $.fn.tooltip.Constructor = Tooltip


  // TOOLTIP NO CONFLICT
  // ===================

  $.fn.tooltip.noConflict = function () {
    $.fn.tooltip = old
    return this
  }

}(jQuery);

/* ========================================================================
 * Bootstrap: popover.js v3.3.6
 * http://getbootstrap.com/javascript/#popovers
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // POPOVER PUBLIC CLASS DEFINITION
  // ===============================

  var Popover = function (element, options) {
    this.init('popover', element, options)
  }

  if (!$.fn.tooltip) throw new Error('Popover requires tooltip.js')

  Popover.VERSION  = '3.3.6'

  Popover.DEFAULTS = $.extend({}, $.fn.tooltip.Constructor.DEFAULTS, {
    placement: 'right',
    trigger: 'click',
    content: '',
    template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
  })


  // NOTE: POPOVER EXTENDS tooltip.js
  // ================================

  Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype)

  Popover.prototype.constructor = Popover

  Popover.prototype.getDefaults = function () {
    return Popover.DEFAULTS
  }

  Popover.prototype.setContent = function () {
    var $tip    = this.tip()
    var title   = this.getTitle()
    var content = this.getContent()

    $tip.find('.popover-title')[this.options.html ? 'html' : 'text'](title)
    $tip.find('.popover-content').children().detach().end()[ // we use append for html objects to maintain js events
      this.options.html ? (typeof content == 'string' ? 'html' : 'append') : 'text'
    ](content)

    $tip.removeClass('fade top bottom left right in')

    // IE8 doesn't accept hiding via the `:empty` pseudo selector, we have to do
    // this manually by checking the contents.
    if (!$tip.find('.popover-title').html()) $tip.find('.popover-title').hide()
  }

  Popover.prototype.hasContent = function () {
    return this.getTitle() || this.getContent()
  }

  Popover.prototype.getContent = function () {
    var $e = this.$element
    var o  = this.options

    return $e.attr('data-content')
      || (typeof o.content == 'function' ?
            o.content.call($e[0]) :
            o.content)
  }

  Popover.prototype.arrow = function () {
    return (this.$arrow = this.$arrow || this.tip().find('.arrow'))
  }


  // POPOVER PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.popover')
      var options = typeof option == 'object' && option

      if (!data && /destroy|hide/.test(option)) return
      if (!data) $this.data('bs.popover', (data = new Popover(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.popover

  $.fn.popover             = Plugin
  $.fn.popover.Constructor = Popover


  // POPOVER NO CONFLICT
  // ===================

  $.fn.popover.noConflict = function () {
    $.fn.popover = old
    return this
  }

}(jQuery);

/* ========================================================================
 * Bootstrap: scrollspy.js v3.3.6
 * http://getbootstrap.com/javascript/#scrollspy
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // SCROLLSPY CLASS DEFINITION
  // ==========================

  function ScrollSpy(element, options) {
    this.$body          = $(document.body)
    this.$scrollElement = $(element).is(document.body) ? $(window) : $(element)
    this.options        = $.extend({}, ScrollSpy.DEFAULTS, options)
    this.selector       = (this.options.target || '') + ' .nav li > a'
    this.offsets        = []
    this.targets        = []
    this.activeTarget   = null
    this.scrollHeight   = 0

    this.$scrollElement.on('scroll.bs.scrollspy', $.proxy(this.process, this))
    this.refresh()
    this.process()
  }

  ScrollSpy.VERSION  = '3.3.6'

  ScrollSpy.DEFAULTS = {
    offset: 10
  }

  ScrollSpy.prototype.getScrollHeight = function () {
    return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
  }

  ScrollSpy.prototype.refresh = function () {
    var that          = this
    var offsetMethod  = 'offset'
    var offsetBase    = 0

    this.offsets      = []
    this.targets      = []
    this.scrollHeight = this.getScrollHeight()

    if (!$.isWindow(this.$scrollElement[0])) {
      offsetMethod = 'position'
      offsetBase   = this.$scrollElement.scrollTop()
    }

    this.$body
      .find(this.selector)
      .map(function () {
        var $el   = $(this)
        var href  = $el.data('target') || $el.attr('href')
        var $href = /^#./.test(href) && $(href)

        return ($href
          && $href.length
          && $href.is(':visible')
          && [[$href[offsetMethod]().top + offsetBase, href]]) || null
      })
      .sort(function (a, b) { return a[0] - b[0] })
      .each(function () {
        that.offsets.push(this[0])
        that.targets.push(this[1])
      })
  }

  ScrollSpy.prototype.process = function () {
    var scrollTop    = this.$scrollElement.scrollTop() + this.options.offset
    var scrollHeight = this.getScrollHeight()
    var maxScroll    = this.options.offset + scrollHeight - this.$scrollElement.height()
    var offsets      = this.offsets
    var targets      = this.targets
    var activeTarget = this.activeTarget
    var i

    if (this.scrollHeight != scrollHeight) {
      this.refresh()
    }

    if (scrollTop >= maxScroll) {
      return activeTarget != (i = targets[targets.length - 1]) && this.activate(i)
    }

    if (activeTarget && scrollTop < offsets[0]) {
      this.activeTarget = null
      return this.clear()
    }

    for (i = offsets.length; i--;) {
      activeTarget != targets[i]
        && scrollTop >= offsets[i]
        && (offsets[i + 1] === undefined || scrollTop < offsets[i + 1])
        && this.activate(targets[i])
    }
  }

  ScrollSpy.prototype.activate = function (target) {
    this.activeTarget = target

    this.clear()

    var selector = this.selector +
      '[data-target="' + target + '"],' +
      this.selector + '[href="' + target + '"]'

    var active = $(selector)
      .parents('li')
      .addClass('active')

    if (active.parent('.dropdown-menu').length) {
      active = active
        .closest('li.dropdown')
        .addClass('active')
    }

    active.trigger('activate.bs.scrollspy')
  }

  ScrollSpy.prototype.clear = function () {
    $(this.selector)
      .parentsUntil(this.options.target, '.active')
      .removeClass('active')
  }


  // SCROLLSPY PLUGIN DEFINITION
  // ===========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.scrollspy')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.scrollspy', (data = new ScrollSpy(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.scrollspy

  $.fn.scrollspy             = Plugin
  $.fn.scrollspy.Constructor = ScrollSpy


  // SCROLLSPY NO CONFLICT
  // =====================

  $.fn.scrollspy.noConflict = function () {
    $.fn.scrollspy = old
    return this
  }


  // SCROLLSPY DATA-API
  // ==================

  $(window).on('load.bs.scrollspy.data-api', function () {
    $('[data-spy="scroll"]').each(function () {
      var $spy = $(this)
      Plugin.call($spy, $spy.data())
    })
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: tab.js v3.3.6
 * http://getbootstrap.com/javascript/#tabs
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // TAB CLASS DEFINITION
  // ====================

  var Tab = function (element) {
    // jscs:disable requireDollarBeforejQueryAssignment
    this.element = $(element)
    // jscs:enable requireDollarBeforejQueryAssignment
  }

  Tab.VERSION = '3.3.6'

  Tab.TRANSITION_DURATION = 150

  Tab.prototype.show = function () {
    var $this    = this.element
    var $ul      = $this.closest('ul:not(.dropdown-menu)')
    var selector = $this.data('target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    if ($this.parent('li').hasClass('active')) return

    var $previous = $ul.find('.active:last a')
    var hideEvent = $.Event('hide.bs.tab', {
      relatedTarget: $this[0]
    })
    var showEvent = $.Event('show.bs.tab', {
      relatedTarget: $previous[0]
    })

    $previous.trigger(hideEvent)
    $this.trigger(showEvent)

    if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) return

    var $target = $(selector)

    this.activate($this.closest('li'), $ul)
    this.activate($target, $target.parent(), function () {
      $previous.trigger({
        type: 'hidden.bs.tab',
        relatedTarget: $this[0]
      })
      $this.trigger({
        type: 'shown.bs.tab',
        relatedTarget: $previous[0]
      })
    })
  }

  Tab.prototype.activate = function (element, container, callback) {
    var $active    = container.find('> .active')
    var transition = callback
      && $.support.transition
      && ($active.length && $active.hasClass('fade') || !!container.find('> .fade').length)

    function next() {
      $active
        .removeClass('active')
        .find('> .dropdown-menu > .active')
          .removeClass('active')
        .end()
        .find('[data-toggle="tab"]')
          .attr('aria-expanded', false)

      element
        .addClass('active')
        .find('[data-toggle="tab"]')
          .attr('aria-expanded', true)

      if (transition) {
        element[0].offsetWidth // reflow for transition
        element.addClass('in')
      } else {
        element.removeClass('fade')
      }

      if (element.parent('.dropdown-menu').length) {
        element
          .closest('li.dropdown')
            .addClass('active')
          .end()
          .find('[data-toggle="tab"]')
            .attr('aria-expanded', true)
      }

      callback && callback()
    }

    $active.length && transition ?
      $active
        .one('bsTransitionEnd', next)
        .emulateTransitionEnd(Tab.TRANSITION_DURATION) :
      next()

    $active.removeClass('in')
  }


  // TAB PLUGIN DEFINITION
  // =====================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.tab')

      if (!data) $this.data('bs.tab', (data = new Tab(this)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.tab

  $.fn.tab             = Plugin
  $.fn.tab.Constructor = Tab


  // TAB NO CONFLICT
  // ===============

  $.fn.tab.noConflict = function () {
    $.fn.tab = old
    return this
  }


  // TAB DATA-API
  // ============

  var clickHandler = function (e) {
    e.preventDefault()
    Plugin.call($(this), 'show')
  }

  $(document)
    .on('click.bs.tab.data-api', '[data-toggle="tab"]', clickHandler)
    .on('click.bs.tab.data-api', '[data-toggle="pill"]', clickHandler)

}(jQuery);

/* ========================================================================
 * Bootstrap: affix.js v3.3.6
 * http://getbootstrap.com/javascript/#affix
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // AFFIX CLASS DEFINITION
  // ======================

  var Affix = function (element, options) {
    this.options = $.extend({}, Affix.DEFAULTS, options)

    this.$target = $(this.options.target)
      .on('scroll.bs.affix.data-api', $.proxy(this.checkPosition, this))
      .on('click.bs.affix.data-api',  $.proxy(this.checkPositionWithEventLoop, this))

    this.$element     = $(element)
    this.affixed      = null
    this.unpin        = null
    this.pinnedOffset = null

    this.checkPosition()
  }

  Affix.VERSION  = '3.3.6'

  Affix.RESET    = 'affix affix-top affix-bottom'

  Affix.DEFAULTS = {
    offset: 0,
    target: window
  }

  Affix.prototype.getState = function (scrollHeight, height, offsetTop, offsetBottom) {
    var scrollTop    = this.$target.scrollTop()
    var position     = this.$element.offset()
    var targetHeight = this.$target.height()

    if (offsetTop != null && this.affixed == 'top') return scrollTop < offsetTop ? 'top' : false

    if (this.affixed == 'bottom') {
      if (offsetTop != null) return (scrollTop + this.unpin <= position.top) ? false : 'bottom'
      return (scrollTop + targetHeight <= scrollHeight - offsetBottom) ? false : 'bottom'
    }

    var initializing   = this.affixed == null
    var colliderTop    = initializing ? scrollTop : position.top
    var colliderHeight = initializing ? targetHeight : height

    if (offsetTop != null && scrollTop <= offsetTop) return 'top'
    if (offsetBottom != null && (colliderTop + colliderHeight >= scrollHeight - offsetBottom)) return 'bottom'

    return false
  }

  Affix.prototype.getPinnedOffset = function () {
    if (this.pinnedOffset) return this.pinnedOffset
    this.$element.removeClass(Affix.RESET).addClass('affix')
    var scrollTop = this.$target.scrollTop()
    var position  = this.$element.offset()
    return (this.pinnedOffset = position.top - scrollTop)
  }

  Affix.prototype.checkPositionWithEventLoop = function () {
    setTimeout($.proxy(this.checkPosition, this), 1)
  }

  Affix.prototype.checkPosition = function () {
    if (!this.$element.is(':visible')) return

    var height       = this.$element.height()
    var offset       = this.options.offset
    var offsetTop    = offset.top
    var offsetBottom = offset.bottom
    var scrollHeight = Math.max($(document).height(), $(document.body).height())

    if (typeof offset != 'object')         offsetBottom = offsetTop = offset
    if (typeof offsetTop == 'function')    offsetTop    = offset.top(this.$element)
    if (typeof offsetBottom == 'function') offsetBottom = offset.bottom(this.$element)

    var affix = this.getState(scrollHeight, height, offsetTop, offsetBottom)

    if (this.affixed != affix) {
      if (this.unpin != null) this.$element.css('top', '')

      var affixType = 'affix' + (affix ? '-' + affix : '')
      var e         = $.Event(affixType + '.bs.affix')

      this.$element.trigger(e)

      if (e.isDefaultPrevented()) return

      this.affixed = affix
      this.unpin = affix == 'bottom' ? this.getPinnedOffset() : null

      this.$element
        .removeClass(Affix.RESET)
        .addClass(affixType)
        .trigger(affixType.replace('affix', 'affixed') + '.bs.affix')
    }

    if (affix == 'bottom') {
      this.$element.offset({
        top: scrollHeight - height - offsetBottom
      })
    }
  }


  // AFFIX PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.affix')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.affix', (data = new Affix(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.affix

  $.fn.affix             = Plugin
  $.fn.affix.Constructor = Affix


  // AFFIX NO CONFLICT
  // =================

  $.fn.affix.noConflict = function () {
    $.fn.affix = old
    return this
  }


  // AFFIX DATA-API
  // ==============

  $(window).on('load', function () {
    $('[data-spy="affix"]').each(function () {
      var $spy = $(this)
      var data = $spy.data()

      data.offset = data.offset || {}

      if (data.offsetBottom != null) data.offset.bottom = data.offsetBottom
      if (data.offsetTop    != null) data.offset.top    = data.offsetTop

      Plugin.call($spy, data)
    })
  })

}(jQuery);

/* Modernizr 2.8.3 (Custom Build) | MIT & BSD
 * Build: http://modernizr.com/download/#-fontface-backgroundsize-borderimage-borderradius-boxshadow-flexbox-hsla-multiplebgs-opacity-rgba-textshadow-cssanimations-csscolumns-generatedcontent-cssgradients-cssreflections-csstransforms-csstransforms3d-csstransitions-applicationcache-canvas-canvastext-draganddrop-hashchange-history-audio-video-indexeddb-input-inputtypes-localstorage-postmessage-sessionstorage-websockets-websqldatabase-webworkers-geolocation-inlinesvg-smil-svg-svgclippaths-touch-webgl-shiv-mq-cssclasses-addtest-prefixed-teststyles-testprop-testallprops-hasevent-prefixes-domprefixes-load
 */
;window.Modernizr=function(a,b,c){function D(a){j.cssText=a}function E(a,b){return D(n.join(a+";")+(b||""))}function F(a,b){return typeof a===b}function G(a,b){return!!~(""+a).indexOf(b)}function H(a,b){for(var d in a){var e=a[d];if(!G(e,"-")&&j[e]!==c)return b=="pfx"?e:!0}return!1}function I(a,b,d){for(var e in a){var f=b[a[e]];if(f!==c)return d===!1?a[e]:F(f,"function")?f.bind(d||b):f}return!1}function J(a,b,c){var d=a.charAt(0).toUpperCase()+a.slice(1),e=(a+" "+p.join(d+" ")+d).split(" ");return F(b,"string")||F(b,"undefined")?H(e,b):(e=(a+" "+q.join(d+" ")+d).split(" "),I(e,b,c))}function K(){e.input=function(c){for(var d=0,e=c.length;d<e;d++)u[c[d]]=c[d]in k;return u.list&&(u.list=!!b.createElement("datalist")&&!!a.HTMLDataListElement),u}("autocomplete autofocus list placeholder max min multiple pattern required step".split(" ")),e.inputtypes=function(a){for(var d=0,e,f,h,i=a.length;d<i;d++)k.setAttribute("type",f=a[d]),e=k.type!=="text",e&&(k.value=l,k.style.cssText="position:absolute;visibility:hidden;",/^range$/.test(f)&&k.style.WebkitAppearance!==c?(g.appendChild(k),h=b.defaultView,e=h.getComputedStyle&&h.getComputedStyle(k,null).WebkitAppearance!=="textfield"&&k.offsetHeight!==0,g.removeChild(k)):/^(search|tel)$/.test(f)||(/^(url|email)$/.test(f)?e=k.checkValidity&&k.checkValidity()===!1:e=k.value!=l)),t[a[d]]=!!e;return t}("search tel url email datetime date month week time datetime-local number range color".split(" "))}var d="2.8.3",e={},f=!0,g=b.documentElement,h="modernizr",i=b.createElement(h),j=i.style,k=b.createElement("input"),l=":)",m={}.toString,n=" -webkit- -moz- -o- -ms- ".split(" "),o="Webkit Moz O ms",p=o.split(" "),q=o.toLowerCase().split(" "),r={svg:"http://www.w3.org/2000/svg"},s={},t={},u={},v=[],w=v.slice,x,y=function(a,c,d,e){var f,i,j,k,l=b.createElement("div"),m=b.body,n=m||b.createElement("body");if(parseInt(d,10))while(d--)j=b.createElement("div"),j.id=e?e[d]:h+(d+1),l.appendChild(j);return f=["&#173;",'<style id="s',h,'">',a,"</style>"].join(""),l.id=h,(m?l:n).innerHTML+=f,n.appendChild(l),m||(n.style.background="",n.style.overflow="hidden",k=g.style.overflow,g.style.overflow="hidden",g.appendChild(n)),i=c(l,a),m?l.parentNode.removeChild(l):(n.parentNode.removeChild(n),g.style.overflow=k),!!i},z=function(b){var c=a.matchMedia||a.msMatchMedia;if(c)return c(b)&&c(b).matches||!1;var d;return y("@media "+b+" { #"+h+" { position: absolute; } }",function(b){d=(a.getComputedStyle?getComputedStyle(b,null):b.currentStyle)["position"]=="absolute"}),d},A=function(){function d(d,e){e=e||b.createElement(a[d]||"div"),d="on"+d;var f=d in e;return f||(e.setAttribute||(e=b.createElement("div")),e.setAttribute&&e.removeAttribute&&(e.setAttribute(d,""),f=F(e[d],"function"),F(e[d],"undefined")||(e[d]=c),e.removeAttribute(d))),e=null,f}var a={select:"input",change:"input",submit:"form",reset:"form",error:"img",load:"img",abort:"img"};return d}(),B={}.hasOwnProperty,C;!F(B,"undefined")&&!F(B.call,"undefined")?C=function(a,b){return B.call(a,b)}:C=function(a,b){return b in a&&F(a.constructor.prototype[b],"undefined")},Function.prototype.bind||(Function.prototype.bind=function(b){var c=this;if(typeof c!="function")throw new TypeError;var d=w.call(arguments,1),e=function(){if(this instanceof e){var a=function(){};a.prototype=c.prototype;var f=new a,g=c.apply(f,d.concat(w.call(arguments)));return Object(g)===g?g:f}return c.apply(b,d.concat(w.call(arguments)))};return e}),s.flexbox=function(){return J("flexWrap")},s.canvas=function(){var a=b.createElement("canvas");return!!a.getContext&&!!a.getContext("2d")},s.canvastext=function(){return!!e.canvas&&!!F(b.createElement("canvas").getContext("2d").fillText,"function")},s.webgl=function(){return!!a.WebGLRenderingContext},s.touch=function(){var c;return"ontouchstart"in a||a.DocumentTouch&&b instanceof DocumentTouch?c=!0:y(["@media (",n.join("touch-enabled),("),h,")","{#modernizr{top:9px;position:absolute}}"].join(""),function(a){c=a.offsetTop===9}),c},s.geolocation=function(){return"geolocation"in navigator},s.postmessage=function(){return!!a.postMessage},s.websqldatabase=function(){return!!a.openDatabase},s.indexedDB=function(){return!!J("indexedDB",a)},s.hashchange=function(){return A("hashchange",a)&&(b.documentMode===c||b.documentMode>7)},s.history=function(){return!!a.history&&!!history.pushState},s.draganddrop=function(){var a=b.createElement("div");return"draggable"in a||"ondragstart"in a&&"ondrop"in a},s.websockets=function(){return"WebSocket"in a||"MozWebSocket"in a},s.rgba=function(){return D("background-color:rgba(150,255,150,.5)"),G(j.backgroundColor,"rgba")},s.hsla=function(){return D("background-color:hsla(120,40%,100%,.5)"),G(j.backgroundColor,"rgba")||G(j.backgroundColor,"hsla")},s.multiplebgs=function(){return D("background:url(https://),url(https://),red url(https://)"),/(url\s*\(.*?){3}/.test(j.background)},s.backgroundsize=function(){return J("backgroundSize")},s.borderimage=function(){return J("borderImage")},s.borderradius=function(){return J("borderRadius")},s.boxshadow=function(){return J("boxShadow")},s.textshadow=function(){return b.createElement("div").style.textShadow===""},s.opacity=function(){return E("opacity:.55"),/^0.55$/.test(j.opacity)},s.cssanimations=function(){return J("animationName")},s.csscolumns=function(){return J("columnCount")},s.cssgradients=function(){var a="background-image:",b="gradient(linear,left top,right bottom,from(#9f9),to(white));",c="linear-gradient(left top,#9f9, white);";return D((a+"-webkit- ".split(" ").join(b+a)+n.join(c+a)).slice(0,-a.length)),G(j.backgroundImage,"gradient")},s.cssreflections=function(){return J("boxReflect")},s.csstransforms=function(){return!!J("transform")},s.csstransforms3d=function(){var a=!!J("perspective");return a&&"webkitPerspective"in g.style&&y("@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}",function(b,c){a=b.offsetLeft===9&&b.offsetHeight===3}),a},s.csstransitions=function(){return J("transition")},s.fontface=function(){var a;return y('@font-face {font-family:"font";src:url("https://")}',function(c,d){var e=b.getElementById("smodernizr"),f=e.sheet||e.styleSheet,g=f?f.cssRules&&f.cssRules[0]?f.cssRules[0].cssText:f.cssText||"":"";a=/src/i.test(g)&&g.indexOf(d.split(" ")[0])===0}),a},s.generatedcontent=function(){var a;return y(["#",h,"{font:0/0 a}#",h,':after{content:"',l,'";visibility:hidden;font:3px/1 a}'].join(""),function(b){a=b.offsetHeight>=3}),a},s.video=function(){var a=b.createElement("video"),c=!1;try{if(c=!!a.canPlayType)c=new Boolean(c),c.ogg=a.canPlayType('video/ogg; codecs="theora"').replace(/^no$/,""),c.h264=a.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/,""),c.webm=a.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/,"")}catch(d){}return c},s.audio=function(){var a=b.createElement("audio"),c=!1;try{if(c=!!a.canPlayType)c=new Boolean(c),c.ogg=a.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,""),c.mp3=a.canPlayType("audio/mpeg;").replace(/^no$/,""),c.wav=a.canPlayType('audio/wav; codecs="1"').replace(/^no$/,""),c.m4a=(a.canPlayType("audio/x-m4a;")||a.canPlayType("audio/aac;")).replace(/^no$/,"")}catch(d){}return c},s.localstorage=function(){try{return localStorage.setItem(h,h),localStorage.removeItem(h),!0}catch(a){return!1}},s.sessionstorage=function(){try{return sessionStorage.setItem(h,h),sessionStorage.removeItem(h),!0}catch(a){return!1}},s.webworkers=function(){return!!a.Worker},s.applicationcache=function(){return!!a.applicationCache},s.svg=function(){return!!b.createElementNS&&!!b.createElementNS(r.svg,"svg").createSVGRect},s.inlinesvg=function(){var a=b.createElement("div");return a.innerHTML="<svg/>",(a.firstChild&&a.firstChild.namespaceURI)==r.svg},s.smil=function(){return!!b.createElementNS&&/SVGAnimate/.test(m.call(b.createElementNS(r.svg,"animate")))},s.svgclippaths=function(){return!!b.createElementNS&&/SVGClipPath/.test(m.call(b.createElementNS(r.svg,"clipPath")))};for(var L in s)C(s,L)&&(x=L.toLowerCase(),e[x]=s[L](),v.push((e[x]?"":"no-")+x));return e.input||K(),e.addTest=function(a,b){if(typeof a=="object")for(var d in a)C(a,d)&&e.addTest(d,a[d]);else{a=a.toLowerCase();if(e[a]!==c)return e;b=typeof b=="function"?b():b,typeof f!="undefined"&&f&&(g.className+=" "+(b?"":"no-")+a),e[a]=b}return e},D(""),i=k=null,function(a,b){function l(a,b){var c=a.createElement("p"),d=a.getElementsByTagName("head")[0]||a.documentElement;return c.innerHTML="x<style>"+b+"</style>",d.insertBefore(c.lastChild,d.firstChild)}function m(){var a=s.elements;return typeof a=="string"?a.split(" "):a}function n(a){var b=j[a[h]];return b||(b={},i++,a[h]=i,j[i]=b),b}function o(a,c,d){c||(c=b);if(k)return c.createElement(a);d||(d=n(c));var g;return d.cache[a]?g=d.cache[a].cloneNode():f.test(a)?g=(d.cache[a]=d.createElem(a)).cloneNode():g=d.createElem(a),g.canHaveChildren&&!e.test(a)&&!g.tagUrn?d.frag.appendChild(g):g}function p(a,c){a||(a=b);if(k)return a.createDocumentFragment();c=c||n(a);var d=c.frag.cloneNode(),e=0,f=m(),g=f.length;for(;e<g;e++)d.createElement(f[e]);return d}function q(a,b){b.cache||(b.cache={},b.createElem=a.createElement,b.createFrag=a.createDocumentFragment,b.frag=b.createFrag()),a.createElement=function(c){return s.shivMethods?o(c,a,b):b.createElem(c)},a.createDocumentFragment=Function("h,f","return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&("+m().join().replace(/[\w\-]+/g,function(a){return b.createElem(a),b.frag.createElement(a),'c("'+a+'")'})+");return n}")(s,b.frag)}function r(a){a||(a=b);var c=n(a);return s.shivCSS&&!g&&!c.hasCSS&&(c.hasCSS=!!l(a,"article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}")),k||q(a,c),a}var c="3.7.0",d=a.html5||{},e=/^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,f=/^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,g,h="_html5shiv",i=0,j={},k;(function(){try{var a=b.createElement("a");a.innerHTML="<xyz></xyz>",g="hidden"in a,k=a.childNodes.length==1||function(){b.createElement("a");var a=b.createDocumentFragment();return typeof a.cloneNode=="undefined"||typeof a.createDocumentFragment=="undefined"||typeof a.createElement=="undefined"}()}catch(c){g=!0,k=!0}})();var s={elements:d.elements||"abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output progress section summary template time video",version:c,shivCSS:d.shivCSS!==!1,supportsUnknownElements:k,shivMethods:d.shivMethods!==!1,type:"default",shivDocument:r,createElement:o,createDocumentFragment:p};a.html5=s,r(b)}(this,b),e._version=d,e._prefixes=n,e._domPrefixes=q,e._cssomPrefixes=p,e.mq=z,e.hasEvent=A,e.testProp=function(a){return H([a])},e.testAllProps=J,e.testStyles=y,e.prefixed=function(a,b,c){return b?J(a,b,c):J(a,"pfx")},g.className=g.className.replace(/(^|\s)no-js(\s|$)/,"$1$2")+(f?" js "+v.join(" "):""),e}(this,this.document),function(a,b,c){function d(a){return"[object Function]"==o.call(a)}function e(a){return"string"==typeof a}function f(){}function g(a){return!a||"loaded"==a||"complete"==a||"uninitialized"==a}function h(){var a=p.shift();q=1,a?a.t?m(function(){("c"==a.t?B.injectCss:B.injectJs)(a.s,0,a.a,a.x,a.e,1)},0):(a(),h()):q=0}function i(a,c,d,e,f,i,j){function k(b){if(!o&&g(l.readyState)&&(u.r=o=1,!q&&h(),l.onload=l.onreadystatechange=null,b)){"img"!=a&&m(function(){t.removeChild(l)},50);for(var d in y[c])y[c].hasOwnProperty(d)&&y[c][d].onload()}}var j=j||B.errorTimeout,l=b.createElement(a),o=0,r=0,u={t:d,s:c,e:f,a:i,x:j};1===y[c]&&(r=1,y[c]=[]),"object"==a?l.data=c:(l.src=c,l.type=a),l.width=l.height="0",l.onerror=l.onload=l.onreadystatechange=function(){k.call(this,r)},p.splice(e,0,u),"img"!=a&&(r||2===y[c]?(t.insertBefore(l,s?null:n),m(k,j)):y[c].push(l))}function j(a,b,c,d,f){return q=0,b=b||"j",e(a)?i("c"==b?v:u,a,b,this.i++,c,d,f):(p.splice(this.i++,0,a),1==p.length&&h()),this}function k(){var a=B;return a.loader={load:j,i:0},a}var l=b.documentElement,m=a.setTimeout,n=b.getElementsByTagName("script")[0],o={}.toString,p=[],q=0,r="MozAppearance"in l.style,s=r&&!!b.createRange().compareNode,t=s?l:n.parentNode,l=a.opera&&"[object Opera]"==o.call(a.opera),l=!!b.attachEvent&&!l,u=r?"object":l?"script":"img",v=l?"script":u,w=Array.isArray||function(a){return"[object Array]"==o.call(a)},x=[],y={},z={timeout:function(a,b){return b.length&&(a.timeout=b[0]),a}},A,B;B=function(a){function b(a){var a=a.split("!"),b=x.length,c=a.pop(),d=a.length,c={url:c,origUrl:c,prefixes:a},e,f,g;for(f=0;f<d;f++)g=a[f].split("="),(e=z[g.shift()])&&(c=e(c,g));for(f=0;f<b;f++)c=x[f](c);return c}function g(a,e,f,g,h){var i=b(a),j=i.autoCallback;i.url.split(".").pop().split("?").shift(),i.bypass||(e&&(e=d(e)?e:e[a]||e[g]||e[a.split("/").pop().split("?")[0]]),i.instead?i.instead(a,e,f,g,h):(y[i.url]?i.noexec=!0:y[i.url]=1,f.load(i.url,i.forceCSS||!i.forceJS&&"css"==i.url.split(".").pop().split("?").shift()?"c":c,i.noexec,i.attrs,i.timeout),(d(e)||d(j))&&f.load(function(){k(),e&&e(i.origUrl,h,g),j&&j(i.origUrl,h,g),y[i.url]=2})))}function h(a,b){function c(a,c){if(a){if(e(a))c||(j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}),g(a,j,b,0,h);else if(Object(a)===a)for(n in m=function(){var b=0,c;for(c in a)a.hasOwnProperty(c)&&b++;return b}(),a)a.hasOwnProperty(n)&&(!c&&!--m&&(d(j)?j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}:j[n]=function(a){return function(){var b=[].slice.call(arguments);a&&a.apply(this,b),l()}}(k[n])),g(a[n],j,b,n,h))}else!c&&l()}var h=!!a.test,i=a.load||a.both,j=a.callback||f,k=j,l=a.complete||f,m,n;c(h?a.yep:a.nope,!!i),i&&c(i)}var i,j,l=this.yepnope.loader;if(e(a))g(a,0,l,0);else if(w(a))for(i=0;i<a.length;i++)j=a[i],e(j)?g(j,0,l,0):w(j)?B(j):Object(j)===j&&h(j,l);else Object(a)===a&&h(a,l)},B.addPrefix=function(a,b){z[a]=b},B.addFilter=function(a){x.push(a)},B.errorTimeout=1e4,null==b.readyState&&b.addEventListener&&(b.readyState="loading",b.addEventListener("DOMContentLoaded",A=function(){b.removeEventListener("DOMContentLoaded",A,0),b.readyState="complete"},0)),a.yepnope=k(),a.yepnope.executeStack=h,a.yepnope.injectJs=function(a,c,d,e,i,j){var k=b.createElement("script"),l,o,e=e||B.errorTimeout;k.src=a;for(o in d)k.setAttribute(o,d[o]);c=j?h:c||f,k.onreadystatechange=k.onload=function(){!l&&g(k.readyState)&&(l=1,c(),k.onload=k.onreadystatechange=null)},m(function(){l||(l=1,c(1))},e),i?k.onload():n.parentNode.insertBefore(k,n)},a.yepnope.injectCss=function(a,c,d,e,g,i){var e=b.createElement("link"),j,c=i?h:c||f;e.href=a,e.rel="stylesheet",e.type="text/css";for(j in d)e.setAttribute(j,d[j]);g||(n.parentNode.insertBefore(e,n),m(c,0))}}(this,document),Modernizr.load=function(){yepnope.apply(window,[].slice.call(arguments,0))};
/**
 * cbpAnimatedHeader.js v1.0.0
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Copyright 2013, Codrops
 * http://www.codrops.com
 */

 ( function( window ) {

'use strict';

// class helper functions from bonzo https://github.com/ded/bonzo

function classReg( className ) {
  return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
}

// classList support for class management
// altho to be fair, the api sucks because it won't accept multiple classes at once
var hasClass, addClass, removeClass;

if ( 'classList' in document.documentElement ) {
  hasClass = function( elem, c ) {
    return elem.classList.contains( c );
  };
  addClass = function( elem, c ) {
    elem.classList.add( c );
  };
  removeClass = function( elem, c ) {
    elem.classList.remove( c );
  };
}
else {
  hasClass = function( elem, c ) {
    return classReg( c ).test( elem.className );
  };
  addClass = function( elem, c ) {
    if ( !hasClass( elem, c ) ) {
      elem.className = elem.className + ' ' + c;
    }
  };
  removeClass = function( elem, c ) {
    elem.className = elem.className.replace( classReg( c ), ' ' );
  };
}

function toggleClass( elem, c ) {
  var fn = hasClass( elem, c ) ? removeClass : addClass;
  fn( elem, c );
}

var classie = {
  // full names
  hasClass: hasClass,
  addClass: addClass,
  removeClass: removeClass,
  toggleClass: toggleClass,
  // short names
  has: hasClass,
  add: addClass,
  remove: removeClass,
  toggle: toggleClass
};

// transport
if ( typeof define === 'function' && define.amd ) {
  // AMD
  define( classie );
} else {
  // browser global
  window.classie = classie;
}

})( window );
var cbpAnimatedHeader = (function() {

	var docElem = document.documentElement,
		header = document.querySelector( '.navbar-fixed-top' ),
		didScroll = false,
		changeHeaderOn = 300;

	function init() {
		window.addEventListener( 'scroll', function( event ) {
			if( !didScroll ) {
				didScroll = true;
				setTimeout( scrollPage, 250 );
			}
		}, false );
	}

	function scrollPage() {
		var sy = scrollY();
		if ( sy >= changeHeaderOn ) {
			classie.add( header, 'navbar-shrink' );
		}
		else {
			classie.remove( header, 'navbar-shrink' );
		}
		didScroll = false;
	}

	function scrollY() {
		return window.pageYOffset || docElem.scrollTop;
	}

	init();

})();
/* interact.js v1.2.6 | https://raw.github.com/taye/interact.js/master/LICENSE */ (function(F){function ma(){}function t(a){if(!a||"object"!==typeof a)return!1;var b=V(a)||q;return/object|function/.test(typeof b.Element)?a instanceof b.Element:1===a.nodeType&&"string"===typeof a.nodeName}function Ba(a){return a===q||!(!a||!a.Window)&&a instanceof a.Window}function da(a){return z(a)&&void 0!==typeof a.length&&A(a.splice)}function z(a){return!!a&&"object"===typeof a}function A(a){return"function"===typeof a}function K(a){return"number"===typeof a}function H(a){return"boolean"===
typeof a}function N(a){return"string"===typeof a}function ea(a){if(!N(a))return!1;Q.querySelector(a);return!0}function x(a,b){for(var c in b)a[c]=b[c];return a}function ra(a,b){for(var c in b){var d=!1,e;for(e in Ca)if(0===c.indexOf(e)&&Ca[e].test(c)){d=!0;break}d||(a[c]=b[c])}return a}function sa(a,b){a.page=a.page||{};a.page.x=b.page.x;a.page.y=b.page.y;a.client=a.client||{};a.client.x=b.client.x;a.client.y=b.client.y;a.timeStamp=b.timeStamp}function Ta(a,b,c){a.page.x=c.page.x-b.page.x;a.page.y=
c.page.y-b.page.y;a.client.x=c.client.x-b.client.x;a.client.y=c.client.y-b.client.y;a.timeStamp=(new Date).getTime()-b.timeStamp;b=Math.max(a.timeStamp/1E3,.001);a.page.speed=fa(a.page.x,a.page.y)/b;a.page.vx=a.page.x/b;a.page.vy=a.page.y/b;a.client.speed=fa(a.client.x,a.page.y)/b;a.client.vx=a.client.x/b;a.client.vy=a.client.y/b}function Ua(a){return a instanceof q.Event||ga&&q.Touch&&a instanceof q.Touch}function ta(a,b,c){c=c||{};a=a||"page";c.x=b[a+"X"];c.y=b[a+"Y"];return c}function Da(a,b){b=
b||{};Va&&Ua(a)?(ta("screen",a,b),b.x+=q.scrollX,b.y+=q.scrollY):ta("page",a,b);return b}function Wa(a,b){b=b||{};Va&&Ua(a)?ta("screen",a,b):ta("client",a,b);return b}function O(a){return K(a.pointerId)?a.pointerId:a.identifier}function Ea(a){return a instanceof nb?a.correspondingUseElement:a}function V(a){if(Ba(a))return a;a=a.ownerDocument||a;return a.defaultView||a.parentWindow||q}function Fa(a){return(a=a instanceof Xa?a.getBoundingClientRect():a.getClientRects()[0])&&{left:a.left,right:a.right,
top:a.top,bottom:a.bottom,width:a.width||a.right-a.left,height:a.height||a.bottom-a.top}}function ua(a){var b,c=Fa(a);!ob&&c&&(b=(b=V(a))||q,a=b.scrollX||b.document.documentElement.scrollLeft,b=b.scrollY||b.document.documentElement.scrollTop,c.left+=a,c.right+=a,c.top+=b,c.bottom+=b);return c}function Ga(a){var b=[];da(a)?(b[0]=a[0],b[1]=a[1]):"touchend"===a.type?1===a.touches.length?(b[0]=a.touches[0],b[1]=a.changedTouches[0]):0===a.touches.length&&(b[0]=a.changedTouches[0],b[1]=a.changedTouches[1]):
(b[0]=a.touches[0],b[1]=a.touches[1]);return b}function Ya(a){for(var b={pageX:0,pageY:0,clientX:0,clientY:0,screenX:0,screenY:0},c,d=0;d<a.length;d++)for(c in b)b[c]+=a[d][c];for(c in b)b[c]/=a.length;return b}function Ha(a){if(a.length||a.touches&&1<a.touches.length){a=Ga(a);var b=Math.min(a[0].pageX,a[1].pageX),c=Math.min(a[0].pageY,a[1].pageY);return{x:b,y:c,left:b,top:c,width:Math.max(a[0].pageX,a[1].pageX)-b,height:Math.max(a[0].pageY,a[1].pageY)-c}}}function Ia(a,b){b=b||D.deltaSource;var c=
b+"X",d=b+"Y",e=Ga(a);return fa(e[0][c]-e[1][c],e[0][d]-e[1][d])}function Ja(a,b,c){c=c||D.deltaSource;var d=c+"X";c+="Y";a=Ga(a);d=180*Math.atan((a[0][c]-a[1][c])/(a[0][d]-a[1][d]))/Math.PI;K(b)&&(b=(d-b)%360,315<b?d-=360+d/360|0:135<b?d-=180+d/360|0:-315>b?d+=360+d/360|0:-135>b&&(d+=180+d/360|0));return d}function na(a,b){var c=a?a.options.origin:D.origin;"parent"===c?c=L(b):"self"===c?c=a.getRect(b):ea(c)&&(c=Ka(b,c)||{x:0,y:0});A(c)&&(c=c(a&&b));t(c)&&(c=ua(c));c.x="x"in c?c.x:c.left;c.y="y"in
c?c.y:c.top;return c}function Za(a,b,c,d){var e=1-a;return e*e*b+2*e*a*c+a*a*d}function Y(a,b){for(;b;){if(b===a)return!0;b=b.parentNode}return!1}function Ka(a,b){for(var c=L(a);t(c);){if(R(c,b))return c;c=L(c)}return null}function L(a){if((a=a.parentNode)&&a instanceof $a)for(;(a=a.host)&&a&&a instanceof $a;);return a}function va(a,b){return a._context===b.ownerDocument||Y(a._context,b)}function Z(a,b,c){return(a=a.options.ignoreFrom)&&t(c)?N(a)?La(c,a,b):t(a)?Y(a,c):!1:!1}function aa(a,b,c){return(a=
a.options.allowFrom)?t(c)?N(a)?La(c,a,b):t(a)?Y(a,c):!1:!1:!0}function ab(a,b){if(!b)return!1;var c=b.options.drag.axis;return"xy"===a||"xy"===c||c===a}function Ma(a,b){var c=a.options;/^resize/.test(b)&&(b="resize");return c[b].snap&&c[b].snap.enabled}function Na(a,b){var c=a.options;/^resize/.test(b)&&(b="resize");return c[b].restrict&&c[b].restrict.enabled}function ha(a,b,c){for(var d=a.options,e=d[c.name].max,d=d[c.name].maxPerElement,h=0,f=0,g=0,k=0,y=r.length;k<y;k++){var n=r[k],u=n.prepared.name;
if(n.interacting()&&(h++,h>=wa||n.target===a&&(f+=u===c.name|0,f>=e||n.element===b&&(g++,u!==c.name||g>=d))))return!1}return 0<wa}function xa(){this.prevDropElement=this.prevDropTarget=this.dropElement=this.dropTarget=this.element=this.target=null;this.prepared={name:null,axis:null,edges:null};this.matches=[];this.matchElements=[];this.inertiaStatus={active:!1,smoothEnd:!1,ending:!1,startEvent:null,upCoords:{},xe:0,ye:0,sx:0,sy:0,t0:0,vx0:0,vys:0,duration:0,resumeDx:0,resumeDy:0,lambda_v0:0,one_ve_v0:0,
i:null};if(A(Function.prototype.bind))this.boundInertiaFrame=this.inertiaFrame.bind(this),this.boundSmoothEndFrame=this.smoothEndFrame.bind(this);else{var a=this;this.boundInertiaFrame=function(){return a.inertiaFrame()};this.boundSmoothEndFrame=function(){return a.smoothEndFrame()}}this.activeDrops={dropzones:[],elements:[],rects:[]};this.pointers=[];this.pointerIds=[];this.downTargets=[];this.downTimes=[];this.holdTimers=[];this.prevCoords={page:{x:0,y:0},client:{x:0,y:0},timeStamp:0};this.curCoords=
{page:{x:0,y:0},client:{x:0,y:0},timeStamp:0};this.startCoords={page:{x:0,y:0},client:{x:0,y:0},timeStamp:0};this.pointerDelta={page:{x:0,y:0,vx:0,vy:0,speed:0},client:{x:0,y:0,vx:0,vy:0,speed:0},timeStamp:0};this.downEvent=null;this.downPointer={};this.prevEvent=this._curEventTarget=this._eventTarget=null;this.tapTime=0;this.prevTap=null;this.startOffset={left:0,right:0,top:0,bottom:0};this.restrictOffset={left:0,right:0,top:0,bottom:0};this.snapOffsets=[];this.gesture={start:{x:0,y:0},startDistance:0,
prevDistance:0,distance:0,scale:1,startAngle:0,prevAngle:0};this.snapStatus={x:0,y:0,dx:0,dy:0,realX:0,realY:0,snappedX:0,snappedY:0,targets:[],locked:!1,changed:!1};this.restrictStatus={dx:0,dy:0,restrictedX:0,restrictedY:0,snap:null,restricted:!1,changed:!1};this.restrictStatus.snap=this.snapStatus;this.resizing=this.dragging=this.gesturing=this.pointerWasMoved=this.pointerIsDown=!1;this.resizeAxes="xy";this.mouse=!1;r.push(this)}function bb(a,b,c){var d=0,e=r.length,h=/mouse/i.test(a.pointerType||
b)||4===a.pointerType,f;a=O(a);if(/down|start/i.test(b))for(d=0;d<e;d++){f=r[d];var g=c;if(f.inertiaStatus.active&&f.target.options[f.prepared.name].inertia.allowResume&&f.mouse===h)for(;g;){if(g===f.element)return f;g=L(g)}}if(h||!ga&&!oa){for(d=0;d<e;d++)if(r[d].mouse&&!r[d].inertiaStatus.active)return r[d];for(d=0;d<e;d++)if(r[d].mouse&&(!/down/.test(b)||!r[d].inertiaStatus.active))return f;f=new xa;f.mouse=!0;return f}for(d=0;d<e;d++)if(-1!==v(r[d].pointerIds,a))return r[d];if(/up|end|out/i.test(b))return null;
for(d=0;d<e;d++)if(f=r[d],!(f.prepared.name&&!f.target.options.gesture.enabled||f.interacting()||!h&&f.mouse))return f;return new xa}function cb(a){return function(b){var c,d=Ea(b.path?b.path[0]:b.target),e=Ea(b.currentTarget),h;if(ga&&/touch/.test(b.type))for(db=(new Date).getTime(),h=0;h<b.changedTouches.length;h++){var f=b.changedTouches[h];if(c=bb(f,b.type,d))c._updateEventTargets(d,e),c[a](f,b,d,e)}else{if(!oa&&/mouse/.test(b.type)){for(h=0;h<r.length;h++)if(!r[h].mouse&&r[h].pointerIsDown)return;
if(500>(new Date).getTime()-db)return}if(c=bb(b,b.type,d))c._updateEventTargets(d,e),c[a](b,b,d,e)}}}function G(a,b,c,d,e,h){var f,g,k=a.target,y=a.snapStatus,n=a.restrictStatus,u=a.pointers,E=(k&&k.options||D).deltaSource,eb=E+"X",l=E+"Y",ia=k?k.options:D,w=na(k,e),m="start"===d,p="end"===d;f=m?a.startCoords:a.curCoords;e=e||a.element;g=x({},f.page);f=x({},f.client);g.x-=w.x;g.y-=w.y;f.x-=w.x;f.y-=w.y;var I=ia[c].snap&&ia[c].snap.relativePoints;!Ma(k,c)||m&&I&&I.length||(this.snap={range:y.range,
locked:y.locked,x:y.snappedX,y:y.snappedY,realX:y.realX,realY:y.realY,dx:y.dx,dy:y.dy},y.locked&&(g.x+=y.dx,g.y+=y.dy,f.x+=y.dx,f.y+=y.dy));!Na(k,c)||m&&ia[c].restrict.elementRect||!n.restricted||(g.x+=n.dx,g.y+=n.dy,f.x+=n.dx,f.y+=n.dy,this.restrict={dx:n.dx,dy:n.dy});this.pageX=g.x;this.pageY=g.y;this.clientX=f.x;this.clientY=f.y;this.x0=a.startCoords.page.x-w.x;this.y0=a.startCoords.page.y-w.y;this.clientX0=a.startCoords.client.x-w.x;this.clientY0=a.startCoords.client.y-w.y;this.ctrlKey=b.ctrlKey;
this.altKey=b.altKey;this.shiftKey=b.shiftKey;this.metaKey=b.metaKey;this.button=b.button;this.buttons=b.buttons;this.target=e;this.t0=a.downTimes[0];this.type=c+(d||"");this.interaction=a;this.interactable=k;e=a.inertiaStatus;e.active&&(this.detail="inertia");h&&(this.relatedTarget=h);p?"client"===E?(this.dx=f.x-a.startCoords.client.x,this.dy=f.y-a.startCoords.client.y):(this.dx=g.x-a.startCoords.page.x,this.dy=g.y-a.startCoords.page.y):m?this.dy=this.dx=0:"inertiastart"===d?(this.dx=a.prevEvent.dx,
this.dy=a.prevEvent.dy):"client"===E?(this.dx=f.x-a.prevEvent.clientX,this.dy=f.y-a.prevEvent.clientY):(this.dx=g.x-a.prevEvent.pageX,this.dy=g.y-a.prevEvent.pageY);a.prevEvent&&"inertia"===a.prevEvent.detail&&!e.active&&ia[c].inertia&&ia[c].inertia.zeroResumeDelta&&(e.resumeDx+=this.dx,e.resumeDy+=this.dy,this.dx=this.dy=0);"resize"===c&&a.resizeAxes?ia.resize.square?("y"===a.resizeAxes?this.dx=this.dy:this.dy=this.dx,this.axes="xy"):(this.axes=a.resizeAxes,"x"===a.resizeAxes?this.dy=0:"y"===a.resizeAxes&&
(this.dx=0)):"gesture"===c&&(this.touches=[u[0],u[1]],m?(this.distance=Ia(u,E),this.box=Ha(u),this.scale=1,this.ds=0,this.angle=Ja(u,void 0,E),this.da=0):p||b instanceof G?(this.distance=a.prevEvent.distance,this.box=a.prevEvent.box,this.scale=a.prevEvent.scale,this.ds=this.scale-1,this.angle=a.prevEvent.angle,this.da=this.angle-a.gesture.startAngle):(this.distance=Ia(u,E),this.box=Ha(u),this.scale=this.distance/a.gesture.startDistance,this.angle=Ja(u,a.gesture.prevAngle,E),this.ds=this.scale-a.gesture.prevScale,
this.da=this.angle-a.gesture.prevAngle));m?(this.timeStamp=a.downTimes[0],this.velocityY=this.velocityX=this.speed=this.duration=this.dt=0):"inertiastart"===d?(this.timeStamp=a.prevEvent.timeStamp,this.dt=a.prevEvent.dt,this.duration=a.prevEvent.duration,this.speed=a.prevEvent.speed,this.velocityX=a.prevEvent.velocityX,this.velocityY=a.prevEvent.velocityY):(this.timeStamp=(new Date).getTime(),this.dt=this.timeStamp-a.prevEvent.timeStamp,this.duration=this.timeStamp-a.downTimes[0],b instanceof G?(b=
this[eb]-a.prevEvent[eb],l=this[l]-a.prevEvent[l],c=this.dt/1E3,this.speed=fa(b,l)/c,this.velocityX=b/c,this.velocityY=l/c):(this.speed=a.pointerDelta[E].speed,this.velocityX=a.pointerDelta[E].vx,this.velocityY=a.pointerDelta[E].vy));(p||"inertiastart"===d)&&600<a.prevEvent.speed&&150>this.timeStamp-a.prevEvent.timeStamp&&(d=180*Math.atan2(a.prevEvent.velocityY,a.prevEvent.velocityX)/Math.PI,0>d&&(d+=360),p=112.5<=d&&247.5>d,l=202.5<=d&&337.5>d,this.swipe={up:l,down:!l&&22.5<=d&&157.5>d,left:p,right:!p&&
(292.5<=d||67.5>d),angle:d,speed:a.prevEvent.speed,velocity:{x:a.prevEvent.velocityX,y:a.prevEvent.velocityY}})}function fb(){this.originalEvent.preventDefault()}function gb(a){var b="";"drag"===a.name&&(b=za.drag);if("resize"===a.name)if(a.axis)b=za[a.name+a.axis];else if(a.edges){for(var b="resize",c=["top","bottom","left","right"],d=0;4>d;d++)a.edges[c[d]]&&(b+=c[d]);b=za[b]}return b}function hb(a,b,c){a=this.getRect(c);var d=!1,e=null,h=null,f,g=x({},b.curCoords.page),e=this.options;if(!a)return null;
if(S.resize&&e.resize.enabled)if(d=e.resize,f={left:!1,right:!1,top:!1,bottom:!1},z(d.edges)){for(var k in f){var y=f,n=k,u;a:{u=k;var E=d.edges[k],l=g,m=b._eventTarget,p=c,w=a,ya=d.margin||pa;if(E){if(!0===E){var q=K(w.width)?w.width:w.right-w.left,I=K(w.height)?w.height:w.bottom-w.top;0>q&&("left"===u?u="right":"right"===u&&(u="left"));0>I&&("top"===u?u="bottom":"bottom"===u&&(u="top"));if("left"===u){u=l.x<(0<=q?w.left:w.right)+ya;break a}if("top"===u){u=l.y<(0<=I?w.top:w.bottom)+ya;break a}if("right"===
u){u=l.x>(0<=q?w.right:w.left)-ya;break a}if("bottom"===u){u=l.y>(0<=I?w.bottom:w.top)-ya;break a}}u=t(m)?t(E)?E===m:La(m,E,p):!1}else u=!1}y[n]=u}f.left=f.left&&!f.right;f.top=f.top&&!f.bottom;d=f.left||f.right||f.top||f.bottom}else c="y"!==e.resize.axis&&g.x>a.right-pa,a="x"!==e.resize.axis&&g.y>a.bottom-pa,d=c||a,h=(c?"x":"")+(a?"y":"");e=d?"resize":S.drag&&e.drag.enabled?"drag":null;S.gesture&&2<=b.pointerIds.length&&!b.dragging&&!b.resizing&&(e="gesture");return e?{name:e,axis:h,edges:f}:null}
function W(a,b){if(!z(a))return null;var c=a.name,d=b.options;return("resize"===c&&d.resize.enabled||"drag"===c&&d.drag.enabled||"gesture"===c&&d.gesture.enabled)&&S[c]?a:null}function qa(a,b){var c={},d=P[a.type],e=Ea(a.path?a.path[0]:a.target),h=e;b=b?!0:!1;for(var f in a)c[f]=a[f];c.originalEvent=a;for(c.preventDefault=fb;t(h);){for(f=0;f<d.selectors.length;f++){var g=d.contexts[f];if(R(h,d.selectors[f])&&Y(g,e)&&Y(g,h)){g=d.listeners[f];c.currentTarget=h;for(var k=0;k<g.length;k++)if(g[k][1]===
b)g[k][0](c)}}h=L(h)}}function Aa(a){return qa.call(this,a,!0)}function l(a,b){return B.get(a,b)||new C(a,b)}function C(a,b){this._element=a;this._iEvents=this._iEvents||{};var c;if(ea(a)){this.selector=a;var d=b&&b.context;c=d?V(d):q;d&&(c.Node?d instanceof c.Node:t(d)||d===c.document)&&(this._context=d)}else c=V(a),t(a,c)&&(ba?(n.add(this._element,J.down,m.pointerDown),n.add(this._element,J.move,m.pointerHover)):(n.add(this._element,"mousedown",m.pointerDown),n.add(this._element,"mousemove",m.pointerHover),
n.add(this._element,"touchstart",m.pointerDown),n.add(this._element,"touchmove",m.pointerHover)));this._doc=c.document;-1===v(ja,this._doc)&&ib(this._doc);B.push(this);this.set(b)}function M(a,b){var c=!1;return function(){c||(q.console.warn(b),c=!0);return a.apply(this,arguments)}}function jb(a){for(var b=0;b<r.length;b++)r[b].pointerEnd(a,a)}function ib(a){if(-1===v(ja,a)){var b=a.defaultView||a.parentWindow,c;for(c in P)n.add(a,c,qa),n.add(a,c,Aa,!0);ba?(J=ba===b.MSPointerEvent?{up:"MSPointerUp",
down:"MSPointerDown",over:"mouseover",out:"mouseout",move:"MSPointerMove",cancel:"MSPointerCancel"}:{up:"pointerup",down:"pointerdown",over:"pointerover",out:"pointerout",move:"pointermove",cancel:"pointercancel"},n.add(a,J.down,m.selectorDown),n.add(a,J.move,m.pointerMove),n.add(a,J.over,m.pointerOver),n.add(a,J.out,m.pointerOut),n.add(a,J.up,m.pointerUp),n.add(a,J.cancel,m.pointerCancel),n.add(a,J.move,m.autoScrollMove)):(n.add(a,"mousedown",m.selectorDown),n.add(a,"mousemove",m.pointerMove),n.add(a,
"mouseup",m.pointerUp),n.add(a,"mouseover",m.pointerOver),n.add(a,"mouseout",m.pointerOut),n.add(a,"touchstart",m.selectorDown),n.add(a,"touchmove",m.pointerMove),n.add(a,"touchend",m.pointerUp),n.add(a,"touchcancel",m.pointerCancel),n.add(a,"mousemove",m.autoScrollMove),n.add(a,"touchmove",m.autoScrollMove));n.add(b,"blur",jb);try{if(b.frameElement){var d=b.frameElement.ownerDocument,e=d.defaultView;n.add(d,"mouseup",m.pointerEnd);n.add(d,"touchend",m.pointerEnd);n.add(d,"touchcancel",m.pointerEnd);
n.add(d,"pointerup",m.pointerEnd);n.add(d,"MSPointerUp",m.pointerEnd);n.add(e,"blur",jb)}}catch(h){l.windowParentError=h}n.add(a,"dragstart",function(a){for(var b=0;b<r.length;b++){var c=r[b];if(c.element&&(c.element===a.target||Y(c.element,a.target))){c.checkAndPreventDefault(a,c.target,c.element);break}}});n.useAttachEvent&&(n.add(a,"selectstart",function(a){var b=r[0];b.currentAction()&&b.checkAndPreventDefault(a)}),n.add(a,"dblclick",cb("ie8Dblclick")));ja.push(a)}}function v(a,b){for(var c=0,
d=a.length;c<d;c++)if(a[c]===b)return c;return-1}function R(a,b,c){if(ka)return ka(a,b,c);q!==F&&(b=b.replace(/\/deep\//g," "));return a[Oa](b)}function La(a,b,c){for(;t(a);){if(R(a,b))return!0;a=L(a);if(a===c)return R(a,b)}return!1}if(F){var q=function(){var a=F.document.createTextNode("");return a.ownerDocument!==F.document&&"function"===typeof F.wrap&&F.wrap(a)===a?F.wrap(F):F}(),Q=q.document,$a=q.DocumentFragment||ma,Xa=q.SVGElement||ma,pb=q.SVGSVGElement||ma,nb=q.SVGElementInstance||ma,qb=q.HTMLElement||
q.Element,ba=q.PointerEvent||q.MSPointerEvent,J,fa=Math.hypot||function(a,b){return Math.sqrt(a*a+b*b)},la={},ja=[],B=[],r=[],Pa=!1,P={},D={base:{accept:null,actionChecker:null,styleCursor:!0,preventDefault:"auto",origin:{x:0,y:0},deltaSource:"page",allowFrom:null,ignoreFrom:null,_context:Q,dropChecker:null},drag:{enabled:!1,manualStart:!0,max:Infinity,maxPerElement:1,snap:null,restrict:null,inertia:null,autoScroll:null,axis:"xy"},drop:{enabled:!1,accept:null,overlap:"pointer"},resize:{enabled:!1,
manualStart:!1,max:Infinity,maxPerElement:1,snap:null,restrict:null,inertia:null,autoScroll:null,square:!1,preserveAspectRatio:!1,axis:"xy",margin:NaN,edges:null,invert:"none"},gesture:{manualStart:!1,enabled:!1,max:Infinity,maxPerElement:1,restrict:null},perAction:{manualStart:!1,max:Infinity,maxPerElement:1,snap:{enabled:!1,endOnly:!1,range:Infinity,targets:null,offsets:null,relativePoints:null},restrict:{enabled:!1,endOnly:!1},autoScroll:{enabled:!1,container:null,margin:60,speed:300},inertia:{enabled:!1,
resistance:10,minSpeed:100,endSpeed:10,allowResume:!0,zeroResumeDelta:!0,smoothEndDuration:300}},_holdDuration:600},p={interaction:null,i:null,x:0,y:0,scroll:function(){var a=p.interaction.target.options[p.interaction.prepared.name].autoScroll,b=a.container||V(p.interaction.element),c=(new Date).getTime(),d=(c-p.prevTimeX)/1E3,e=(c-p.prevTimeY)/1E3,h;a.velocity?(h=a.velocity.x,a=a.velocity.y):h=a=a.speed;d*=h;e*=a;if(1<=d||1<=e)Ba(b)?b.scrollBy(p.x*d,p.y*e):b&&(b.scrollLeft+=p.x*d,b.scrollTop+=p.y*
e),1<=d&&(p.prevTimeX=c),1<=e&&(p.prevTimeY=c);p.isScrolling&&(X(p.i),p.i=T(p.scroll))},isScrolling:!1,prevTimeX:0,prevTimeY:0,start:function(a){p.isScrolling=!0;X(p.i);p.interaction=a;p.prevTimeX=(new Date).getTime();p.prevTimeY=(new Date).getTime();p.i=T(p.scroll)},stop:function(){p.isScrolling=!1;X(p.i)}},ga="ontouchstart"in q||q.DocumentTouch&&Q instanceof q.DocumentTouch,oa=!!ba,pa=ga||oa?20:10,Qa=1,db=0,wa=Infinity,za=Q.all&&!q.atob?{drag:"move",resizex:"e-resize",resizey:"s-resize",resizexy:"se-resize",
resizetop:"n-resize",resizeleft:"w-resize",resizebottom:"s-resize",resizeright:"e-resize",resizetopleft:"se-resize",resizebottomright:"se-resize",resizetopright:"ne-resize",resizebottomleft:"ne-resize",gesture:""}:{drag:"move",resizex:"ew-resize",resizey:"ns-resize",resizexy:"nwse-resize",resizetop:"ns-resize",resizeleft:"ew-resize",resizebottom:"ns-resize",resizeright:"ew-resize",resizetopleft:"nwse-resize",resizebottomright:"nwse-resize",resizetopright:"nesw-resize",resizebottomleft:"nesw-resize",
gesture:""},S={drag:!0,resize:!0,gesture:!0},kb="onmousewheel"in Q?"mousewheel":"wheel",ca="dragstart dragmove draginertiastart dragend dragenter dragleave dropactivate dropdeactivate dropmove drop resizestart resizemove resizeinertiastart resizeend gesturestart gesturemove gestureinertiastart gestureend down move up cancel tap doubletap hold".split(" "),U={},Va="Opera"==navigator.appName&&ga&&navigator.userAgent.match("Presto"),ob=/iP(hone|od|ad)/.test(navigator.platform)&&/OS 7[^\d]/.test(navigator.appVersion),
Oa="matches"in Element.prototype?"matches":"webkitMatchesSelector"in Element.prototype?"webkitMatchesSelector":"mozMatchesSelector"in Element.prototype?"mozMatchesSelector":"oMatchesSelector"in Element.prototype?"oMatchesSelector":"msMatchesSelector",ka,T=F.requestAnimationFrame,X=F.cancelAnimationFrame,n=function(){function a(b,c,d,h){var l,m=v(k,b),p=y[m],q,I,r=d;if(p&&p.events)if(e&&(q=n[m],I=v(q.supplied,d),r=q.wrapped[I]),"all"===c)for(c in p.events)p.events.hasOwnProperty(c)&&a(b,c,"all");else{if(p.events[c]){var t=
p.events[c].length;if("all"===d){for(l=0;l<t;l++)a(b,c,p.events[c][l],Boolean(h));return}for(l=0;l<t;l++)if(p.events[c][l]===d){b[f](g+c,r,h||!1);p.events[c].splice(l,1);e&&q&&(q.useCount[I]--,0===q.useCount[I]&&(q.supplied.splice(I,1),q.wrapped.splice(I,1),q.useCount.splice(I,1)));break}p.events[c]&&0===p.events[c].length&&(p.events[c]=null,p.typeCount--)}p.typeCount||(y.splice(m,1),k.splice(m,1),n.splice(m,1))}}function b(){this.returnValue=!1}function c(){this.cancelBubble=!0}function d(){this.immediatePropagationStopped=
this.cancelBubble=!0}var e="attachEvent"in q&&!("addEventListener"in q),h=e?"attachEvent":"addEventListener",f=e?"detachEvent":"removeEventListener",g=e?"on":"",k=[],y=[],n=[];return{add:function(a,f,l,p){var m=v(k,a),q=y[m];q||(q={events:{},typeCount:0},m=k.push(a)-1,y.push(q),n.push(e?{supplied:[],wrapped:[],useCount:[]}:null));q.events[f]||(q.events[f]=[],q.typeCount++);if(-1===v(q.events[f],l)){if(e){var m=n[m],r=v(m.supplied,l),t=m.wrapped[r]||function(e){e.immediatePropagationStopped||(e.target=
e.srcElement,e.currentTarget=a,e.preventDefault=e.preventDefault||b,e.stopPropagation=e.stopPropagation||c,e.stopImmediatePropagation=e.stopImmediatePropagation||d,/mouse|click/.test(e.type)&&(e.pageX=e.clientX+V(a).document.documentElement.scrollLeft,e.pageY=e.clientY+V(a).document.documentElement.scrollTop),l(e))};p=a[h](g+f,t,Boolean(p));-1===r?(m.supplied.push(l),m.wrapped.push(t),m.useCount.push(1)):m.useCount[r]++}else p=a[h](f,l,p||!1);q.events[f].push(l);return p}},remove:a,useAttachEvent:e,
_elements:k,_targets:y,_attachedListeners:n}}(),Ca={webkit:/(Movement[XY]|Radius[XY]|RotationAngle|Force)$/};xa.prototype={getPageXY:function(a,b){return Da(a,b,this)},getClientXY:function(a,b){return Wa(a,b,this)},setEventXY:function(a,b){var c=1<b.length?Ya(b):b[0];Da(c,la,this);a.page.x=la.x;a.page.y=la.y;Wa(c,la,this);a.client.x=la.x;a.client.y=la.y;a.timeStamp=(new Date).getTime()},pointerOver:function(a,b,c){function d(a,b){a&&va(a,c)&&!Z(a,c,c)&&aa(a,c,c)&&R(c,b)&&(e.push(a),h.push(c))}if(!this.prepared.name&&
this.mouse){var e=[],h=[],f=this.element;this.addPointer(a);!this.target||!Z(this.target,this.element,c)&&aa(this.target,this.element,c)||(this.element=this.target=null,this.matches=[],this.matchElements=[]);var g=B.get(c),k=g&&!Z(g,c,c)&&aa(g,c,c)&&W(g.getAction(a,b,this,c),g);k&&!ha(g,c,k)&&(k=null);k?(this.target=g,this.element=c,this.matches=[],this.matchElements=[]):(B.forEachSelector(d),this.validateSelector(a,b,e,h)?(this.matches=e,this.matchElements=h,this.pointerHover(a,b,this.matches,this.matchElements),
n.add(c,ba?J.move:"mousemove",m.pointerHover)):this.target&&(Y(f,c)?(this.pointerHover(a,b,this.matches,this.matchElements),n.add(this.element,ba?J.move:"mousemove",m.pointerHover)):(this.element=this.target=null,this.matches=[],this.matchElements=[])))}},pointerHover:function(a,b,c,d,e,h){c=this.target;if(!this.prepared.name&&this.mouse){var f;this.setEventXY(this.curCoords,[a]);e?f=this.validateSelector(a,b,e,h):c&&(f=W(c.getAction(this.pointers[0],b,this,this.element),this.target));c&&c.options.styleCursor&&
(c._doc.documentElement.style.cursor=f?gb(f):"")}else this.prepared.name&&this.checkAndPreventDefault(b,c,this.element)},pointerOut:function(a,b,c){this.prepared.name||(B.get(c)||n.remove(c,ba?J.move:"mousemove",m.pointerHover),this.target&&this.target.options.styleCursor&&!this.interacting()&&(this.target._doc.documentElement.style.cursor=""))},selectorDown:function(a,b,c,d){function e(a,b,d){d=ka?d.querySelectorAll(b):void 0;va(a,g)&&!Z(a,g,c)&&aa(a,g,c)&&R(g,b,d)&&(h.matches.push(a),h.matchElements.push(g))}
var h=this,f=n.useAttachEvent?x({},b):b,g=c,k=this.addPointer(a),l;this.holdTimers[k]=setTimeout(function(){h.pointerHold(n.useAttachEvent?f:a,f,c,d)},D._holdDuration);this.pointerIsDown=!0;if(this.inertiaStatus.active&&this.target.selector)for(;t(g);){if(g===this.element&&W(this.target.getAction(a,b,this,this.element),this.target).name===this.prepared.name){X(this.inertiaStatus.i);this.inertiaStatus.active=!1;this.collectEventTargets(a,b,c,"down");return}g=L(g)}if(!this.interacting()){this.setEventXY(this.curCoords,
[a]);for(this.downEvent=b;t(g)&&!l;)this.matches=[],this.matchElements=[],B.forEachSelector(e),l=this.validateSelector(a,b,this.matches,this.matchElements),g=L(g);if(l)return this.prepared.name=l.name,this.prepared.axis=l.axis,this.prepared.edges=l.edges,this.collectEventTargets(a,b,c,"down"),this.pointerDown(a,b,c,d,l);this.downTimes[k]=(new Date).getTime();this.downTargets[k]=c;ra(this.downPointer,a);sa(this.prevCoords,this.curCoords);this.pointerWasMoved=!1}this.collectEventTargets(a,b,c,"down")},
pointerDown:function(a,b,c,d,e){if(!e&&!this.inertiaStatus.active&&this.pointerWasMoved&&this.prepared.name)this.checkAndPreventDefault(b,this.target,this.element);else{this.pointerIsDown=!0;this.downEvent=b;var h=this.addPointer(a),f;if(1<this.pointerIds.length&&this.target._element===this.element){var g=W(e||this.target.getAction(a,b,this,this.element),this.target);ha(this.target,this.element,g)&&(f=g);this.prepared.name=null}else this.prepared.name||(g=B.get(d))&&!Z(g,d,c)&&aa(g,d,c)&&(f=W(e||
g.getAction(a,b,this,d),g,c))&&ha(g,d,f)&&(this.target=g,this.element=d);var k=(g=this.target)&&g.options;!g||!e&&this.prepared.name?this.inertiaStatus.active&&d===this.element&&W(g.getAction(a,b,this,this.element),g).name===this.prepared.name&&(X(this.inertiaStatus.i),this.inertiaStatus.active=!1,this.checkAndPreventDefault(b,g,this.element)):(f=f||W(e||g.getAction(a,b,this,d),g,this.element),this.setEventXY(this.startCoords,this.pointers),f&&(k.styleCursor&&(g._doc.documentElement.style.cursor=
gb(f)),this.resizeAxes="resize"===f.name?f.axis:null,"gesture"===f&&2>this.pointerIds.length&&(f=null),this.prepared.name=f.name,this.prepared.axis=f.axis,this.prepared.edges=f.edges,this.snapStatus.snappedX=this.snapStatus.snappedY=this.restrictStatus.restrictedX=this.restrictStatus.restrictedY=NaN,this.downTimes[h]=(new Date).getTime(),this.downTargets[h]=c,ra(this.downPointer,a),sa(this.prevCoords,this.startCoords),this.pointerWasMoved=!1,this.checkAndPreventDefault(b,g,this.element)))}},setModifications:function(a,
b){var c=this.target,d=!0,e=Ma(c,this.prepared.name)&&(!c.options[this.prepared.name].snap.endOnly||b),c=Na(c,this.prepared.name)&&(!c.options[this.prepared.name].restrict.endOnly||b);e?this.setSnapping(a):this.snapStatus.locked=!1;c?this.setRestriction(a):this.restrictStatus.restricted=!1;e&&this.snapStatus.locked&&!this.snapStatus.changed?d=c&&this.restrictStatus.restricted&&this.restrictStatus.changed:c&&this.restrictStatus.restricted&&!this.restrictStatus.changed&&(d=!1);return d},setStartOffsets:function(a,
b,c){a=b.getRect(c);var d=na(b,c);c=b.options[this.prepared.name].snap;b=b.options[this.prepared.name].restrict;var e,h;a?(this.startOffset.left=this.startCoords.page.x-a.left,this.startOffset.top=this.startCoords.page.y-a.top,this.startOffset.right=a.right-this.startCoords.page.x,this.startOffset.bottom=a.bottom-this.startCoords.page.y,e="width"in a?a.width:a.right-a.left,h="height"in a?a.height:a.bottom-a.top):this.startOffset.left=this.startOffset.top=this.startOffset.right=this.startOffset.bottom=
0;this.snapOffsets.splice(0);d=c&&"startCoords"===c.offset?{x:this.startCoords.page.x-d.x,y:this.startCoords.page.y-d.y}:c&&c.offset||{x:0,y:0};if(a&&c&&c.relativePoints&&c.relativePoints.length)for(var f=0;f<c.relativePoints.length;f++)this.snapOffsets.push({x:this.startOffset.left-e*c.relativePoints[f].x+d.x,y:this.startOffset.top-h*c.relativePoints[f].y+d.y});else this.snapOffsets.push(d);a&&b.elementRect?(this.restrictOffset.left=this.startOffset.left-e*b.elementRect.left,this.restrictOffset.top=
this.startOffset.top-h*b.elementRect.top,this.restrictOffset.right=this.startOffset.right-e*(1-b.elementRect.right),this.restrictOffset.bottom=this.startOffset.bottom-h*(1-b.elementRect.bottom)):this.restrictOffset.left=this.restrictOffset.top=this.restrictOffset.right=this.restrictOffset.bottom=0},start:function(a,b,c){this.interacting()||!this.pointerIsDown||this.pointerIds.length<("gesture"===a.name?2:1)||(-1===v(r,this)&&r.push(this),this.prepared.name||this.setEventXY(this.startCoords),this.prepared.name=
a.name,this.prepared.axis=a.axis,this.prepared.edges=a.edges,this.target=b,this.element=c,this.setStartOffsets(a.name,b,c),this.setModifications(this.startCoords.page),this.prevEvent=this[this.prepared.name+"Start"](this.downEvent))},pointerMove:function(a,b,c,d,e){if(this.inertiaStatus.active){d=this.inertiaStatus.upCoords.page;var h=this.inertiaStatus.upCoords.client;this.setEventXY(this.curCoords,[{pageX:d.x+this.inertiaStatus.sx,pageY:d.y+this.inertiaStatus.sy,clientX:h.x+this.inertiaStatus.sx,
clientY:h.y+this.inertiaStatus.sy}])}else this.recordPointer(a),this.setEventXY(this.curCoords,this.pointers);d=this.curCoords.page.x===this.prevCoords.page.x&&this.curCoords.page.y===this.prevCoords.page.y&&this.curCoords.client.x===this.prevCoords.client.x&&this.curCoords.client.y===this.prevCoords.client.y;var f,g,h=this.mouse?0:v(this.pointerIds,O(a));this.pointerIsDown&&!this.pointerWasMoved&&(f=this.curCoords.client.x-this.startCoords.client.x,g=this.curCoords.client.y-this.startCoords.client.y,
this.pointerWasMoved=fa(f,g)>Qa);d||this.pointerIsDown&&!this.pointerWasMoved||(this.pointerIsDown&&clearTimeout(this.holdTimers[h]),this.collectEventTargets(a,b,c,"move"));if(this.pointerIsDown)if(d&&this.pointerWasMoved&&!e)this.checkAndPreventDefault(b,this.target,this.element);else if(Ta(this.pointerDelta,this.prevCoords,this.curCoords),this.prepared.name){if(this.pointerWasMoved&&(!this.inertiaStatus.active||a instanceof G&&/inertiastart/.test(a.type))){if(!this.interacting()&&(Ta(this.pointerDelta,
this.prevCoords,this.curCoords),"drag"===this.prepared.name)){f=Math.abs(f);g=Math.abs(g);d=this.target.options.drag.axis;var k=f>g?"x":f<g?"y":"xy";if("xy"!==k&&"xy"!==d&&d!==k){this.prepared.name=null;for(var l=c;t(l);){if((g=B.get(l))&&g!==this.target&&!g.options.drag.manualStart&&"drag"===g.getAction(this.downPointer,this.downEvent,this,l).name&&ab(k,g)){this.prepared.name="drag";this.target=g;this.element=l;break}l=L(l)}if(!this.prepared.name){var n=this;g=function(a,b,d){d=ka?d.querySelectorAll(b):
void 0;if(a!==n.target&&va(a,c)&&!a.options.drag.manualStart&&!Z(a,l,c)&&aa(a,l,c)&&R(l,b,d)&&"drag"===a.getAction(n.downPointer,n.downEvent,n,l).name&&ab(k,a)&&ha(a,l,"drag"))return a};for(l=c;t(l);){if(f=B.forEachSelector(g)){this.prepared.name="drag";this.target=f;this.element=l;break}l=L(l)}}}}if((g=!!this.prepared.name&&!this.interacting())&&(this.target.options[this.prepared.name].manualStart||!ha(this.target,this.element,this.prepared))){this.stop(b);return}if(this.prepared.name&&this.target){g&&
this.start(this.prepared,this.target,this.element);if(this.setModifications(this.curCoords.page,e)||g)this.prevEvent=this[this.prepared.name+"Move"](b);this.checkAndPreventDefault(b,this.target,this.element)}}sa(this.prevCoords,this.curCoords);(this.dragging||this.resizing)&&this.autoScrollMove(a)}},dragStart:function(a){var b=new G(this,a,"drag","start",this.element);this.dragging=!0;this.target.fire(b);this.activeDrops.dropzones=[];this.activeDrops.elements=[];this.activeDrops.rects=[];this.dynamicDrop||
this.setActiveDrops(this.element);a=this.getDropEvents(a,b);a.activate&&this.fireActiveDrops(a.activate);return b},dragMove:function(a){var b=this.target,c=new G(this,a,"drag","move",this.element),d=this.getDrop(c,a,this.element);this.dropTarget=d.dropzone;this.dropElement=d.element;a=this.getDropEvents(a,c);b.fire(c);a.leave&&this.prevDropTarget.fire(a.leave);a.enter&&this.dropTarget.fire(a.enter);a.move&&this.dropTarget.fire(a.move);this.prevDropTarget=this.dropTarget;this.prevDropElement=this.dropElement;
return c},resizeStart:function(a){a=new G(this,a,"resize","start",this.element);if(this.prepared.edges){var b=this.target.getRect(this.element);if(this.target.options.resize.square||this.target.options.resize.preserveAspectRatio){var c=x({},this.prepared.edges);c.top=c.top||c.left&&!c.bottom;c.left=c.left||c.top&&!c.right;c.bottom=c.bottom||c.right&&!c.top;c.right=c.right||c.bottom&&!c.left;this.prepared._linkedEdges=c}else this.prepared._linkedEdges=null;this.target.options.resize.preserveAspectRatio&&
(this.resizeStartAspectRatio=b.width/b.height);this.resizeRects={start:b,current:x({},b),restricted:x({},b),previous:x({},b),delta:{left:0,right:0,width:0,top:0,bottom:0,height:0}};a.rect=this.resizeRects.restricted;a.deltaRect=this.resizeRects.delta}this.target.fire(a);this.resizing=!0;return a},resizeMove:function(a){a=new G(this,a,"resize","move",this.element);var b=this.prepared.edges,c=this.target.options.resize.invert,d="reposition"===c||"negate"===c;if(b){var e=a.dx,h=a.dy,f=this.resizeRects.start,
g=this.resizeRects.current,k=this.resizeRects.restricted,l=this.resizeRects.delta,n=x(this.resizeRects.previous,k),m=b;if(this.target.options.resize.preserveAspectRatio){var p=this.resizeStartAspectRatio,b=this.prepared._linkedEdges;if(m.left&&m.bottom||m.right&&m.top)h=-e/p;else if(m.left||m.right)h=e/p;else if(m.top||m.bottom)e=h*p}else if(this.target.options.resize.square)if(b=this.prepared._linkedEdges,m.left&&m.bottom||m.right&&m.top)h=-e;else if(m.left||m.right)h=e;else if(m.top||m.bottom)e=
h;b.top&&(g.top+=h);b.bottom&&(g.bottom+=h);b.left&&(g.left+=e);b.right&&(g.right+=e);d?(x(k,g),"reposition"===c&&(k.top>k.bottom&&(b=k.top,k.top=k.bottom,k.bottom=b),k.left>k.right&&(b=k.left,k.left=k.right,k.right=b))):(k.top=Math.min(g.top,f.bottom),k.bottom=Math.max(g.bottom,f.top),k.left=Math.min(g.left,f.right),k.right=Math.max(g.right,f.left));k.width=k.right-k.left;k.height=k.bottom-k.top;for(var q in k)l[q]=k[q]-n[q];a.edges=this.prepared.edges;a.rect=k;a.deltaRect=l}this.target.fire(a);
return a},gestureStart:function(a){a=new G(this,a,"gesture","start",this.element);a.ds=0;this.gesture.startDistance=this.gesture.prevDistance=a.distance;this.gesture.startAngle=this.gesture.prevAngle=a.angle;this.gesture.scale=1;this.gesturing=!0;this.target.fire(a);return a},gestureMove:function(a){if(!this.pointerIds.length)return this.prevEvent;a=new G(this,a,"gesture","move",this.element);a.ds=a.scale-this.gesture.scale;this.target.fire(a);this.gesture.prevAngle=a.angle;this.gesture.prevDistance=
a.distance;Infinity===a.scale||null===a.scale||void 0===a.scale||isNaN(a.scale)||(this.gesture.scale=a.scale);return a},pointerHold:function(a,b,c){this.collectEventTargets(a,b,c,"hold")},pointerUp:function(a,b,c,d){var e=this.mouse?0:v(this.pointerIds,O(a));clearTimeout(this.holdTimers[e]);this.collectEventTargets(a,b,c,"up");this.collectEventTargets(a,b,c,"tap");this.pointerEnd(a,b,c,d);this.removePointer(a)},pointerCancel:function(a,b,c,d){var e=this.mouse?0:v(this.pointerIds,O(a));clearTimeout(this.holdTimers[e]);
this.collectEventTargets(a,b,c,"cancel");this.pointerEnd(a,b,c,d);this.removePointer(a)},ie8Dblclick:function(a,b,c){this.prevTap&&b.clientX===this.prevTap.clientX&&b.clientY===this.prevTap.clientY&&c===this.prevTap.target&&(this.downTargets[0]=c,this.downTimes[0]=(new Date).getTime(),this.collectEventTargets(a,b,c,"tap"))},pointerEnd:function(a,b,c,d){var e,h=this.target,f=h&&h.options,g=f&&this.prepared.name&&f[this.prepared.name].inertia;e=this.inertiaStatus;if(this.interacting()){if(e.active&&
!e.ending)return;var k=(new Date).getTime(),l=!1,m=!1,n=!1,p=Ma(h,this.prepared.name)&&f[this.prepared.name].snap.endOnly,q=Na(h,this.prepared.name)&&f[this.prepared.name].restrict.endOnly,r=0,t=0,f=this.dragging?"x"===f.drag.axis?Math.abs(this.pointerDelta.client.vx):"y"===f.drag.axis?Math.abs(this.pointerDelta.client.vy):this.pointerDelta.client.speed:this.pointerDelta.client.speed,m=(l=g&&g.enabled&&"gesture"!==this.prepared.name&&b!==e.startEvent)&&50>k-this.curCoords.timeStamp&&f>g.minSpeed&&
f>g.endSpeed;l&&!m&&(p||q)&&(g={},g.snap=g.restrict=g,p&&(this.setSnapping(this.curCoords.page,g),g.locked&&(r+=g.dx,t+=g.dy)),q&&(this.setRestriction(this.curCoords.page,g),g.restricted&&(r+=g.dx,t+=g.dy)),r||t)&&(n=!0);if(m||n){sa(e.upCoords,this.curCoords);this.pointers[0]=e.startEvent=new G(this,b,this.prepared.name,"inertiastart",this.element);e.t0=k;h.fire(e.startEvent);m?(e.vx0=this.pointerDelta.client.vx,e.vy0=this.pointerDelta.client.vy,e.v0=f,this.calcInertia(e),b=x({},this.curCoords.page),
h=na(h,this.element),b.x=b.x+e.xe-h.x,b.y=b.y+e.ye-h.y,h={useStatusXY:!0,x:b.x,y:b.y,dx:0,dy:0,snap:null},h.snap=h,r=t=0,p&&(b=this.setSnapping(this.curCoords.page,h),b.locked&&(r+=b.dx,t+=b.dy)),q&&(h=this.setRestriction(this.curCoords.page,h),h.restricted&&(r+=h.dx,t+=h.dy)),e.modifiedXe+=r,e.modifiedYe+=t,e.i=T(this.boundInertiaFrame)):(e.smoothEnd=!0,e.xe=r,e.ye=t,e.sx=e.sy=0,e.i=T(this.boundSmoothEndFrame));e.active=!0;return}(p||q)&&this.pointerMove(a,b,c,d,!0)}this.dragging?(e=new G(this,b,
"drag","end",this.element),q=this.getDrop(e,b,this.element),this.dropTarget=q.dropzone,this.dropElement=q.element,q=this.getDropEvents(b,e),q.leave&&this.prevDropTarget.fire(q.leave),q.enter&&this.dropTarget.fire(q.enter),q.drop&&this.dropTarget.fire(q.drop),q.deactivate&&this.fireActiveDrops(q.deactivate),h.fire(e)):this.resizing?(e=new G(this,b,"resize","end",this.element),h.fire(e)):this.gesturing&&(e=new G(this,b,"gesture","end",this.element),h.fire(e));this.stop(b)},collectDrops:function(a){var b=
[],c=[],d;a=a||this.element;for(d=0;d<B.length;d++)if(B[d].options.drop.enabled){var e=B[d],h=e.options.drop.accept;if(!(t(h)&&h!==a||N(h)&&!R(a,h)))for(var h=e.selector?e._context.querySelectorAll(e.selector):[e._element],f=0,g=h.length;f<g;f++){var k=h[f];k!==a&&(b.push(e),c.push(k))}}return{dropzones:b,elements:c}},fireActiveDrops:function(a){var b,c,d,e;for(b=0;b<this.activeDrops.dropzones.length;b++)c=this.activeDrops.dropzones[b],d=this.activeDrops.elements[b],d!==e&&(a.target=d,c.fire(a)),
e=d},setActiveDrops:function(a){a=this.collectDrops(a,!0);this.activeDrops.dropzones=a.dropzones;this.activeDrops.elements=a.elements;this.activeDrops.rects=[];for(a=0;a<this.activeDrops.dropzones.length;a++)this.activeDrops.rects[a]=this.activeDrops.dropzones[a].getRect(this.activeDrops.elements[a])},getDrop:function(a,b,c){var d=[];Pa&&this.setActiveDrops(c);for(var e=0;e<this.activeDrops.dropzones.length;e++){var h=this.activeDrops.elements[e];d.push(this.activeDrops.dropzones[e].dropCheck(a,b,
this.target,c,h,this.activeDrops.rects[e])?h:null)}c=(b=d[0])?0:-1;for(var f,e=[],g=[],h=1;h<d.length;h++)if((a=d[h])&&a!==b)if(!b)b=a,c=h;else if(a.parentNode!==a.ownerDocument)if(b.parentNode===a.ownerDocument)b=a,c=h;else{if(!e.length)for(f=b;f.parentNode&&f.parentNode!==f.ownerDocument;)e.unshift(f),f=f.parentNode;if(b instanceof qb&&a instanceof Xa&&!(a instanceof pb)){if(a===b.parentNode)continue;f=a.ownerSVGElement}else f=a;for(g=[];f.parentNode!==f.ownerDocument;)g.unshift(f),f=f.parentNode;
for(f=0;g[f]&&g[f]===e[f];)f++;f=[g[f-1],g[f],e[f]];for(g=f[0].lastChild;g;){if(g===f[1]){b=a;c=h;e=[];break}else if(g===f[2])break;g=g.previousSibling}}d=c;return{dropzone:this.activeDrops.dropzones[d]||null,element:this.activeDrops.elements[d]||null}},getDropEvents:function(a,b){var c={enter:null,leave:null,activate:null,deactivate:null,move:null,drop:null};this.dropElement!==this.prevDropElement&&(this.prevDropTarget&&(c.leave={target:this.prevDropElement,dropzone:this.prevDropTarget,relatedTarget:b.target,
draggable:b.interactable,dragEvent:b,interaction:this,timeStamp:b.timeStamp,type:"dragleave"},b.dragLeave=this.prevDropElement,b.prevDropzone=this.prevDropTarget),this.dropTarget&&(c.enter={target:this.dropElement,dropzone:this.dropTarget,relatedTarget:b.target,draggable:b.interactable,dragEvent:b,interaction:this,timeStamp:b.timeStamp,type:"dragenter"},b.dragEnter=this.dropElement,b.dropzone=this.dropTarget));"dragend"===b.type&&this.dropTarget&&(c.drop={target:this.dropElement,dropzone:this.dropTarget,
relatedTarget:b.target,draggable:b.interactable,dragEvent:b,interaction:this,timeStamp:b.timeStamp,type:"drop"},b.dropzone=this.dropTarget);"dragstart"===b.type&&(c.activate={target:null,dropzone:null,relatedTarget:b.target,draggable:b.interactable,dragEvent:b,interaction:this,timeStamp:b.timeStamp,type:"dropactivate"});"dragend"===b.type&&(c.deactivate={target:null,dropzone:null,relatedTarget:b.target,draggable:b.interactable,dragEvent:b,interaction:this,timeStamp:b.timeStamp,type:"dropdeactivate"});
"dragmove"===b.type&&this.dropTarget&&(c.move={target:this.dropElement,dropzone:this.dropTarget,relatedTarget:b.target,draggable:b.interactable,dragEvent:b,interaction:this,dragmove:b,timeStamp:b.timeStamp,type:"dropmove"},b.dropzone=this.dropTarget);return c},currentAction:function(){return this.dragging&&"drag"||this.resizing&&"resize"||this.gesturing&&"gesture"||null},interacting:function(){return this.dragging||this.resizing||this.gesturing},clearTargets:function(){this.dropTarget=this.dropElement=
this.prevDropTarget=this.prevDropElement=this.target=this.element=null},stop:function(a){if(this.interacting()){p.stop();this.matches=[];this.matchElements=[];var b=this.target;b.options.styleCursor&&(b._doc.documentElement.style.cursor="");a&&A(a.preventDefault)&&this.checkAndPreventDefault(a,b,this.element);this.dragging&&(this.activeDrops.dropzones=this.activeDrops.elements=this.activeDrops.rects=null)}this.clearTargets();this.pointerIsDown=this.snapStatus.locked=this.dragging=this.resizing=this.gesturing=
!1;this.prepared.name=this.prevEvent=null;for(a=this.inertiaStatus.resumeDx=this.inertiaStatus.resumeDy=0;a<this.pointers.length;a++)-1===v(this.pointerIds,O(this.pointers[a]))&&this.pointers.splice(a,1)},inertiaFrame:function(){var a,b,c=this.inertiaStatus;a=this.target.options[this.prepared.name].inertia.resistance;b=(new Date).getTime()/1E3-c.t0;if(b<c.te){b=1-(Math.exp(-a*b)-c.lambda_v0)/c.one_ve_v0;if(c.modifiedXe===c.xe&&c.modifiedYe===c.ye)c.sx=c.xe*b,c.sy=c.ye*b;else{var d=c.ye,e=c.modifiedYe;
a=Za(b,0,c.xe,c.modifiedXe);b=Za(b,0,d,e);c.sx=a;c.sy=b}this.pointerMove(c.startEvent,c.startEvent);c.i=T(this.boundInertiaFrame)}else c.ending=!0,c.sx=c.modifiedXe,c.sy=c.modifiedYe,this.pointerMove(c.startEvent,c.startEvent),this.pointerEnd(c.startEvent,c.startEvent),c.active=c.ending=!1},smoothEndFrame:function(){var a=this.inertiaStatus,b=(new Date).getTime()-a.t0,c=this.target.options[this.prepared.name].inertia.smoothEndDuration;if(b<c){var d;d=b/c;a.sx=-a.xe*d*(d-2)+0;b/=c;a.sy=-a.ye*b*(b-
2)+0;this.pointerMove(a.startEvent,a.startEvent);a.i=T(this.boundSmoothEndFrame)}else a.ending=!0,a.sx=a.xe,a.sy=a.ye,this.pointerMove(a.startEvent,a.startEvent),this.pointerEnd(a.startEvent,a.startEvent),a.smoothEnd=a.active=a.ending=!1},addPointer:function(a){var b=O(a),c=this.mouse?0:v(this.pointerIds,b);-1===c&&(c=this.pointerIds.length);this.pointerIds[c]=b;this.pointers[c]=a;return c},removePointer:function(a){a=O(a);a=this.mouse?0:v(this.pointerIds,a);-1!==a&&(this.pointers.splice(a,1),this.pointerIds.splice(a,
1),this.downTargets.splice(a,1),this.downTimes.splice(a,1),this.holdTimers.splice(a,1))},recordPointer:function(a){var b=this.mouse?0:v(this.pointerIds,O(a));-1!==b&&(this.pointers[b]=a)},collectEventTargets:function(a,b,c,d){function e(a,b,e){e=ka?e.querySelectorAll(b):void 0;a._iEvents[d]&&t(k)&&va(a,k)&&!Z(a,k,c)&&aa(a,k,c)&&R(k,b,e)&&(f.push(a),g.push(k))}var h=this.mouse?0:v(this.pointerIds,O(a));if("tap"!==d||!this.pointerWasMoved&&this.downTargets[h]&&this.downTargets[h]===c){for(var f=[],
g=[],k=c;k;)l.isSet(k)&&l(k)._iEvents[d]&&(f.push(l(k)),g.push(k)),B.forEachSelector(e),k=L(k);(f.length||"tap"===d)&&this.firePointers(a,b,c,f,g,d)}},firePointers:function(a,b,c,d,e,h){var f=this.mouse?0:v(this.pointerIds,O(a)),g={},k,l;"doubletap"===h?g=a:(ra(g,b),b!==a&&ra(g,a),g.preventDefault=fb,g.stopPropagation=G.prototype.stopPropagation,g.stopImmediatePropagation=G.prototype.stopImmediatePropagation,g.interaction=this,g.timeStamp=(new Date).getTime(),g.originalEvent=b,g.originalPointer=a,
g.type=h,g.pointerId=O(a),g.pointerType=this.mouse?"mouse":oa?N(a.pointerType)?a.pointerType:[,,"touch","pen","mouse"][a.pointerType]:"touch");"tap"===h&&(g.dt=g.timeStamp-this.downTimes[f],k=g.timeStamp-this.tapTime,l=!!(this.prevTap&&"doubletap"!==this.prevTap.type&&this.prevTap.target===g.target&&500>k),g["double"]=l,this.tapTime=g.timeStamp);for(a=0;a<d.length&&!(g.currentTarget=e[a],g.interactable=d[a],d[a].fire(g),g.immediatePropagationStopped||g.propagationStopped&&e[a+1]!==g.currentTarget);a++);
l?(d={},x(d,g),d.dt=k,d.type="doubletap",this.collectEventTargets(d,b,c,"doubletap"),this.prevTap=d):"tap"===h&&(this.prevTap=g)},validateSelector:function(a,b,c,d){for(var e=0,h=c.length;e<h;e++){var f=c[e],g=d[e],k=W(f.getAction(a,b,this,g),f);if(k&&ha(f,g,k))return this.target=f,this.element=g,k}},setSnapping:function(a,b){var c=this.target.options[this.prepared.name].snap,d=[],e,h,f;b=b||this.snapStatus;b.useStatusXY?h={x:b.x,y:b.y}:(e=na(this.target,this.element),h=x({},a),h.x-=e.x,h.y-=e.y);
b.realX=h.x;b.realY=h.y;h.x-=this.inertiaStatus.resumeDx;h.y-=this.inertiaStatus.resumeDy;for(var g=c.targets?c.targets.length:0,k=0;k<this.snapOffsets.length;k++){var l=h.x-this.snapOffsets[k].x,m=h.y-this.snapOffsets[k].y;for(f=0;f<g;f++)(e=A(c.targets[f])?c.targets[f](l,m,this):c.targets[f])&&d.push({x:K(e.x)?e.x+this.snapOffsets[k].x:l,y:K(e.y)?e.y+this.snapOffsets[k].y:m,range:K(e.range)?e.range:c.range})}var c=null,k=!1,n=0,p=0;f=m=l=0;for(g=d.length;f<g;f++){e=d[f];var q=e.range,r=e.x-h.x,
t=e.y-h.y,w=fa(r,t),v=w<=q;Infinity===q&&k&&Infinity!==p&&(v=!1);if(!c||(v?k&&Infinity!==q?w/q<n/p:Infinity===q&&Infinity!==p||w<n:!k&&w<n))Infinity===q&&(v=!0),c=e,n=w,p=q,k=v,l=r,m=t,b.range=q}c?(d=b.snappedX!==c.x||b.snappedY!==c.y,b.snappedX=c.x,b.snappedY=c.y):(d=!0,b.snappedX=NaN,b.snappedY=NaN);b.dx=l;b.dy=m;b.changed=d||k&&!b.locked;b.locked=k;return b},setRestriction:function(a,b){var c=this.target,d=c&&c.options[this.prepared.name].restrict,e=d&&d.restriction;if(!e)return b;b=b||this.restrictStatus;
d=b.useStatusXY?d={x:b.x,y:b.y}:d=x({},a);b.snap&&b.snap.locked&&(d.x+=b.snap.dx||0,d.y+=b.snap.dy||0);d.x-=this.inertiaStatus.resumeDx;d.y-=this.inertiaStatus.resumeDy;b.dx=0;b.dy=0;b.restricted=!1;if(N(e)&&(e="parent"===e?L(this.element):"self"===e?c.getRect(this.element):Ka(this.element,e),!e))return b;A(e)&&(e=e(d.x,d.y,this.element));t(e)&&(e=ua(e));(c=e)?"x"in e&&"y"in e?(e=Math.max(Math.min(c.x+c.width-this.restrictOffset.right,d.x),c.x+this.restrictOffset.left),c=Math.max(Math.min(c.y+c.height-
this.restrictOffset.bottom,d.y),c.y+this.restrictOffset.top)):(e=Math.max(Math.min(c.right-this.restrictOffset.right,d.x),c.left+this.restrictOffset.left),c=Math.max(Math.min(c.bottom-this.restrictOffset.bottom,d.y),c.top+this.restrictOffset.top)):(e=d.x,c=d.y);b.dx=e-d.x;b.dy=c-d.y;b.changed=b.restrictedX!==e||b.restrictedY!==c;b.restricted=!(!b.dx&&!b.dy);b.restrictedX=e;b.restrictedY=c;return b},checkAndPreventDefault:function(a,b,c){if(b=b||this.target){b=b.options;var d=b.preventDefault;"auto"===
d&&c&&!/^(input|select|textarea)$/i.test(a.target.nodeName)?/down|start/i.test(a.type)&&"drag"===this.prepared.name&&"xy"!==b.drag.axis||b[this.prepared.name]&&b[this.prepared.name].manualStart&&!this.interacting()||a.preventDefault():"always"===d&&a.preventDefault()}},calcInertia:function(a){var b=this.target.options[this.prepared.name].inertia,c=b.resistance,d=-Math.log(b.endSpeed/a.v0)/c;a.x0=this.prevEvent.pageX;a.y0=this.prevEvent.pageY;a.t0=a.startEvent.timeStamp/1E3;a.sx=a.sy=0;a.modifiedXe=
a.xe=(a.vx0-d)/c;a.modifiedYe=a.ye=(a.vy0-d)/c;a.te=d;a.lambda_v0=c/a.v0;a.one_ve_v0=1-b.endSpeed/a.v0},autoScrollMove:function(a){var b;if(b=this.interacting()){b=this.prepared.name;var c=this.target.options;/^resize/.test(b)&&(b="resize");b=c[b].autoScroll&&c[b].autoScroll.enabled}if(b)if(this.inertiaStatus.active)p.x=p.y=0;else{var d,e=this.target.options[this.prepared.name].autoScroll,h=e.container||V(this.element);Ba(h)?(d=a.clientX<p.margin,b=a.clientY<p.margin,c=a.clientX>h.innerWidth-p.margin,
a=a.clientY>h.innerHeight-p.margin):(h=Fa(h),d=a.clientX<h.left+p.margin,b=a.clientY<h.top+p.margin,c=a.clientX>h.right-p.margin,a=a.clientY>h.bottom-p.margin);p.x=c?1:d?-1:0;p.y=a?1:b?-1:0;p.isScrolling||(p.margin=e.margin,p.speed=e.speed,p.start(this))}},_updateEventTargets:function(a,b){this._eventTarget=a;this._curEventTarget=b}};G.prototype={preventDefault:ma,stopImmediatePropagation:function(){this.immediatePropagationStopped=this.propagationStopped=!0},stopPropagation:function(){this.propagationStopped=
!0}};for(var m={},lb="dragStart dragMove resizeStart resizeMove gestureStart gestureMove pointerOver pointerOut pointerHover selectorDown pointerDown pointerMove pointerUp pointerCancel pointerEnd addPointer removePointer recordPointer autoScrollMove".split(" "),Ra=0,Sa=lb.length;Ra<Sa;Ra++){var mb=lb[Ra];m[mb]=cb(mb)}B.indexOfElement=function(a,b){b=b||Q;for(var c=0;c<this.length;c++){var d=this[c];if(d.selector===a&&d._context===b||!d.selector&&d._element===a)return c}return-1};B.get=function(a,
b){return this[this.indexOfElement(a,b&&b.context)]};B.forEachSelector=function(a){for(var b=0;b<this.length;b++){var c=this[b];if(c.selector&&(c=a(c,c.selector,c._context,b,this),void 0!==c))return c}};C.prototype={setOnEvents:function(a,b){"drop"===a?(A(b.ondrop)&&(this.ondrop=b.ondrop),A(b.ondropactivate)&&(this.ondropactivate=b.ondropactivate),A(b.ondropdeactivate)&&(this.ondropdeactivate=b.ondropdeactivate),A(b.ondragenter)&&(this.ondragenter=b.ondragenter),A(b.ondragleave)&&(this.ondragleave=
b.ondragleave),A(b.ondropmove)&&(this.ondropmove=b.ondropmove)):(a="on"+a,A(b.onstart)&&(this[a+"start"]=b.onstart),A(b.onmove)&&(this[a+"move"]=b.onmove),A(b.onend)&&(this[a+"end"]=b.onend),A(b.oninertiastart)&&(this[a+"inertiastart"]=b.oninertiastart));return this},draggable:function(a){return z(a)?(this.options.drag.enabled=!1===a.enabled?!1:!0,this.setPerAction("drag",a),this.setOnEvents("drag",a),/^x$|^y$|^xy$/.test(a.axis)?this.options.drag.axis=a.axis:null===a.axis&&delete this.options.drag.axis,
this):H(a)?(this.options.drag.enabled=a,this):this.options.drag},setPerAction:function(a,b){for(var c in b)c in D[a]&&(z(b[c])?(this.options[a][c]=x(this.options[a][c]||{},b[c]),z(D.perAction[c])&&"enabled"in D.perAction[c]&&(this.options[a][c].enabled=!1===b[c].enabled?!1:!0)):H(b[c])&&z(D.perAction[c])?this.options[a][c].enabled=b[c]:void 0!==b[c]&&(this.options[a][c]=b[c]))},dropzone:function(a){return z(a)?(this.options.drop.enabled=!1===a.enabled?!1:!0,this.setOnEvents("drop",a),/^(pointer|center)$/.test(a.overlap)?
this.options.drop.overlap=a.overlap:K(a.overlap)&&(this.options.drop.overlap=Math.max(Math.min(1,a.overlap),0)),"accept"in a&&(this.options.drop.accept=a.accept),"checker"in a&&(this.options.drop.checker=a.checker),this):H(a)?(this.options.drop.enabled=a,this):this.options.drop},dropCheck:function(a,b,c,d,e,h){var f=!1;if(!(h=h||this.getRect(e)))return this.options.drop.checker?this.options.drop.checker(a,b,f,this,e,c,d):!1;var g=this.options.drop.overlap;if("pointer"===g){var k=Da(a),f=na(c,d);k.x+=
f.x;k.y+=f.y;f=k.x>h.left&&k.x<h.right;k=k.y>h.top&&k.y<h.bottom;f=f&&k}k=c.getRect(d);if("center"===g)var f=k.left+k.width/2,l=k.top+k.height/2,f=f>=h.left&&f<=h.right&&l>=h.top&&l<=h.bottom;K(g)&&(f=Math.max(0,Math.min(h.right,k.right)-Math.max(h.left,k.left))*Math.max(0,Math.min(h.bottom,k.bottom)-Math.max(h.top,k.top))/(k.width*k.height)>=g);this.options.drop.checker&&(f=this.options.drop.checker(a,b,f,this,e,c,d));return f},dropChecker:function(a){return A(a)?(this.options.drop.checker=a,this):
null===a?(delete this.options.getRect,this):this.options.drop.checker},accept:function(a){return t(a)||ea(a)?(this.options.drop.accept=a,this):null===a?(delete this.options.drop.accept,this):this.options.drop.accept},resizable:function(a){return z(a)?(this.options.resize.enabled=!1===a.enabled?!1:!0,this.setPerAction("resize",a),this.setOnEvents("resize",a),/^x$|^y$|^xy$/.test(a.axis)?this.options.resize.axis=a.axis:null===a.axis&&(this.options.resize.axis=D.resize.axis),H(a.preserveAspectRatio)?
this.options.resize.preserveAspectRatio=a.preserveAspectRatio:H(a.square)&&(this.options.resize.square=a.square),this):H(a)?(this.options.resize.enabled=a,this):this.options.resize},squareResize:function(a){return H(a)?(this.options.resize.square=a,this):null===a?(delete this.options.resize.square,this):this.options.resize.square},gesturable:function(a){return z(a)?(this.options.gesture.enabled=!1===a.enabled?!1:!0,this.setPerAction("gesture",a),this.setOnEvents("gesture",a),this):H(a)?(this.options.gesture.enabled=
a,this):this.options.gesture},autoScroll:function(a){z(a)?a=x({actions:["drag","resize"]},a):H(a)&&(a={actions:["drag","resize"],enabled:a});return this.setOptions("autoScroll",a)},snap:function(a){a=this.setOptions("snap",a);return a===this?this:a.drag},setOptions:function(a,b){var c=b&&da(b.actions)?b.actions:["drag"],d;if(z(b)||H(b)){for(d=0;d<c.length;d++){var e=/resize/.test(c[d])?"resize":c[d];z(this.options[e])&&(e=this.options[e][a],z(b)?(x(e,b),e.enabled=!1===b.enabled?!1:!0,"snap"===a&&
("grid"===e.mode?e.targets=[l.createSnapGrid(x({offset:e.gridOffset||{x:0,y:0}},e.grid||{}))]:"anchor"===e.mode?e.targets=e.anchors:"path"===e.mode&&(e.targets=e.paths),"elementOrigin"in b&&(e.relativePoints=[b.elementOrigin]))):H(b)&&(e.enabled=b))}return this}c={};e=["drag","resize","gesture"];for(d=0;d<e.length;d++)a in D[e[d]]&&(c[e[d]]=this.options[e[d]][a]);return c},inertia:function(a){a=this.setOptions("inertia",a);return a===this?this:a.drag},getAction:function(a,b,c,d){var e=this.defaultActionChecker(a,
c,d);return this.options.actionChecker?this.options.actionChecker(a,b,e,this,d,c):e},defaultActionChecker:hb,actionChecker:function(a){return A(a)?(this.options.actionChecker=a,this):null===a?(delete this.options.actionChecker,this):this.options.actionChecker},getRect:function(a){a=a||this._element;this.selector&&!t(a)&&(a=this._context.querySelector(this.selector));return ua(a)},rectChecker:function(a){return A(a)?(this.getRect=a,this):null===a?(delete this.options.getRect,this):this.getRect},styleCursor:function(a){return H(a)?
(this.options.styleCursor=a,this):null===a?(delete this.options.styleCursor,this):this.options.styleCursor},preventDefault:function(a){return/^(always|never|auto)$/.test(a)?(this.options.preventDefault=a,this):H(a)?(this.options.preventDefault=a?"always":"never",this):this.options.preventDefault},origin:function(a){return ea(a)||z(a)?(this.options.origin=a,this):this.options.origin},deltaSource:function(a){return"page"===a||"client"===a?(this.options.deltaSource=a,this):this.options.deltaSource},
restrict:function(a){if(!z(a))return this.setOptions("restrict",a);for(var b=["drag","resize","gesture"],c,d=0;d<b.length;d++){var e=b[d];e in a&&(c=x({actions:[e],restriction:a[e]},a),c=this.setOptions("restrict",c))}return c},context:function(){return this._context},_context:Q,ignoreFrom:function(a){return ea(a)||t(a)?(this.options.ignoreFrom=a,this):this.options.ignoreFrom},allowFrom:function(a){return ea(a)||t(a)?(this.options.allowFrom=a,this):this.options.allowFrom},element:function(){return this._element},
fire:function(a){if(!a||!a.type||-1===v(ca,a.type))return this;var b,c,d,e="on"+a.type;if(a.type in this._iEvents)for(b=this._iEvents[a.type],c=0,d=b.length;c<d&&!a.immediatePropagationStopped;c++)b[c](a);if(A(this[e]))this[e](a);if(a.type in U&&(b=U[a.type]))for(c=0,d=b.length;c<d&&!a.immediatePropagationStopped;c++)b[c](a);return this},on:function(a,b,c){var d;N(a)&&-1!==a.search(" ")&&(a=a.trim().split(/ +/));if(da(a)){for(d=0;d<a.length;d++)this.on(a[d],b,c);return this}if(z(a)){for(d in a)this.on(d,
a[d],b);return this}"wheel"===a&&(a=kb);c=c?!0:!1;if(-1!==v(ca,a))a in this._iEvents?this._iEvents[a].push(b):this._iEvents[a]=[b];else if(this.selector){if(!P[a])for(P[a]={selectors:[],contexts:[],listeners:[]},d=0;d<ja.length;d++)n.add(ja[d],a,qa),n.add(ja[d],a,Aa,!0);a=P[a];for(d=a.selectors.length-1;0<=d&&(a.selectors[d]!==this.selector||a.contexts[d]!==this._context);d--);-1===d&&(d=a.selectors.length,a.selectors.push(this.selector),a.contexts.push(this._context),a.listeners.push([]));a.listeners[d].push([b,
c])}else n.add(this._element,a,b,c);return this},off:function(a,b,c){var d;N(a)&&-1!==a.search(" ")&&(a=a.trim().split(/ +/));if(da(a)){for(d=0;d<a.length;d++)this.off(a[d],b,c);return this}if(z(a)){for(var e in a)this.off(e,a[e],b);return this}e=-1;c=c?!0:!1;"wheel"===a&&(a=kb);if(-1!==v(ca,a))(c=this._iEvents[a])&&-1!==(e=v(c,b))&&this._iEvents[a].splice(e,1);else if(this.selector){var h=P[a],f=!1;if(!h)return this;for(e=h.selectors.length-1;0<=e;e--)if(h.selectors[e]===this.selector&&h.contexts[e]===
this._context){var g=h.listeners[e];for(d=g.length-1;0<=d;d--){var k=g[d][1];if(g[d][0]===b&&k===c){g.splice(d,1);g.length||(h.selectors.splice(e,1),h.contexts.splice(e,1),h.listeners.splice(e,1),n.remove(this._context,a,qa),n.remove(this._context,a,Aa,!0),h.selectors.length||(P[a]=null));f=!0;break}}if(f)break}}else n.remove(this._element,a,b,c);return this},set:function(a){z(a)||(a={});this.options=x({},D.base);var b,c=["drag","drop","resize","gesture"],d=["draggable","dropzone","resizable","gesturable"],
e=x(x({},D.perAction),a[h]||{});for(b=0;b<c.length;b++){var h=c[b];this.options[h]=x({},D[h]);this.setPerAction(h,e);this[d[b]](a[h])}c="accept actionChecker allowFrom deltaSource dropChecker ignoreFrom origin preventDefault rectChecker styleCursor".split(" ");b=0;for(Sa=c.length;b<Sa;b++)if(d=c[b],this.options[d]=D.base[d],d in a)this[d](a[d]);return this},unset:function(){n.remove(this._element,"all");if(N(this.selector))for(var a in P)for(var b=P[a];0<b.selectors.length;){b.selectors[0]===this.selector&&
b.contexts[0]===this._context&&(b.selectors.splice(0,1),b.contexts.splice(0,1),b.listeners.splice(0,1),b.selectors.length||(P[a]=null));n.remove(this._context,a,qa);n.remove(this._context,a,Aa,!0);break}else n.remove(this,"all"),this.options.styleCursor&&(this._element.style.cursor="");this.dropzone(!1);B.splice(v(B,this),1);return l}};C.prototype.snap=M(C.prototype.snap,"Interactable#snap is deprecated. See the new documentation for snapping at http://interactjs.io/docs/snapping");C.prototype.restrict=
M(C.prototype.restrict,"Interactable#restrict is deprecated. See the new documentation for resticting at http://interactjs.io/docs/restriction");C.prototype.inertia=M(C.prototype.inertia,"Interactable#inertia is deprecated. See the new documentation for inertia at http://interactjs.io/docs/inertia");C.prototype.autoScroll=M(C.prototype.autoScroll,"Interactable#autoScroll is deprecated. See the new documentation for autoScroll at http://interactjs.io/docs/#autoscroll");C.prototype.squareResize=M(C.prototype.squareResize,
"Interactable#squareResize is deprecated. See http://interactjs.io/docs/#resize-square");C.prototype.accept=M(C.prototype.accept,"Interactable#accept is deprecated. use Interactable#dropzone({ accept: target }) instead");C.prototype.dropChecker=M(C.prototype.dropChecker,"Interactable#dropChecker is deprecated. use Interactable#dropzone({ dropChecker: checkerFunction }) instead");C.prototype.context=M(C.prototype.context,"Interactable#context as a method is deprecated. It will soon be a DOM Node instead");
l.isSet=function(a,b){return-1!==B.indexOfElement(a,b&&b.context)};l.on=function(a,b,c){N(a)&&-1!==a.search(" ")&&(a=a.trim().split(/ +/));if(da(a)){for(var d=0;d<a.length;d++)l.on(a[d],b,c);return l}if(z(a)){for(d in a)l.on(d,a[d],b);return l}-1!==v(ca,a)?U[a]?U[a].push(b):U[a]=[b]:n.add(Q,a,b,c);return l};l.off=function(a,b,c){N(a)&&-1!==a.search(" ")&&(a=a.trim().split(/ +/));if(da(a)){for(var d=0;d<a.length;d++)l.off(a[d],b,c);return l}if(z(a)){for(d in a)l.off(d,a[d],b);return l}if(-1===v(ca,
a))n.remove(Q,a,b,c);else{var e;a in U&&-1!==(e=v(U[a],b))&&U[a].splice(e,1)}return l};l.enableDragging=M(function(a){return null!==a&&void 0!==a?(S.drag=a,l):S.drag},"interact.enableDragging is deprecated and will soon be removed.");l.enableResizing=M(function(a){return null!==a&&void 0!==a?(S.resize=a,l):S.resize},"interact.enableResizing is deprecated and will soon be removed.");l.enableGesturing=M(function(a){return null!==a&&void 0!==a?(S.gesture=a,l):S.gesture},"interact.enableGesturing is deprecated and will soon be removed.");
l.eventTypes=ca;l.debug=function(){var a=r[0]||new xa;return{interactions:r,target:a.target,dragging:a.dragging,resizing:a.resizing,gesturing:a.gesturing,prepared:a.prepared,matches:a.matches,matchElements:a.matchElements,prevCoords:a.prevCoords,startCoords:a.startCoords,pointerIds:a.pointerIds,pointers:a.pointers,addPointer:m.addPointer,removePointer:m.removePointer,recordPointer:m.recordPointer,snap:a.snapStatus,restrict:a.restrictStatus,inertia:a.inertiaStatus,downTime:a.downTimes[0],downEvent:a.downEvent,
downPointer:a.downPointer,prevEvent:a.prevEvent,Interactable:C,interactables:B,pointerIsDown:a.pointerIsDown,defaultOptions:D,defaultActionChecker:hb,actionCursors:za,dragMove:m.dragMove,resizeMove:m.resizeMove,gestureMove:m.gestureMove,pointerUp:m.pointerUp,pointerDown:m.pointerDown,pointerMove:m.pointerMove,pointerHover:m.pointerHover,eventTypes:ca,events:n,globalEvents:U,delegatedEvents:P,prefixedPropREs:Ca}};l.getPointerAverage=Ya;l.getTouchBBox=Ha;l.getTouchDistance=Ia;l.getTouchAngle=Ja;l.getElementRect=
ua;l.getElementClientRect=Fa;l.matchesSelector=R;l.closest=Ka;l.margin=M(function(a){return K(a)?(pa=a,l):pa},"interact.margin is deprecated. Use interact(target).resizable({ margin: number }); instead.");l.supportsTouch=function(){return ga};l.supportsPointerEvent=function(){return oa};l.stop=function(a){for(var b=r.length-1;0<=b;b--)r[b].stop(a);return l};l.dynamicDrop=function(a){return H(a)?(Pa=a,l):Pa};l.pointerMoveTolerance=function(a){return K(a)?(Qa=a,this):Qa};l.maxInteractions=function(a){return K(a)?
(wa=a,this):wa};l.createSnapGrid=function(a){return function(b,c){var d=0,e=0;z(a.offset)&&(d=a.offset.x,e=a.offset.y);return{x:Math.round((b-d)/a.x)*a.x+d,y:Math.round((c-e)/a.y)*a.y+e,range:a.range}}};ib(Q);Oa in Element.prototype&&A(Element.prototype[Oa])||(ka=function(a,b,c){c=c||a.parentNode.querySelectorAll(b);b=0;for(var d=c.length;b<d;b++)if(c[b]===a)return!0;return!1});(function(){for(var a=0,b=["ms","moz","webkit","o"],c=0;c<b.length&&!F.requestAnimationFrame;++c)T=F[b[c]+"RequestAnimationFrame"],
X=F[b[c]+"CancelAnimationFrame"]||F[b[c]+"CancelRequestAnimationFrame"];T||(T=function(b){var c=(new Date).getTime(),h=Math.max(0,16-(c-a)),f=setTimeout(function(){b(c+h)},h);a=c+h;return f});X||(X=function(a){clearTimeout(a)})})();"undefined"!==typeof exports?("undefined"!==typeof module&&module.exports&&(exports=module.exports=l),exports.interact=l):"function"===typeof define&&define.amd?define("interact",function(){return l}):F.interact=l}})("undefined"===typeof window?void 0:window);
//# sourceMappingURL=interact.min.js.map

/*
* jQuery.eraser v0.5.2
* makes any image or canvas erasable by the user, using touch or mouse input
* https://github.com/boblemarin/jQuery.eraser
*
* Usage:
*
* $('#myImage').eraser(); // simple way
*
* $('#canvas').eraser( {
*   size: 20, // define brush size (default value is 40)
*   completeRatio: .65, // allows to call function when a erased ratio is reached (between 0 and 1, default is .7 )
*   completeFunction: myFunction // callback function when complete ratio is reached
* } );
*
* $('#image').eraser( 'clear' ); // erases all canvas content
*
* $('#image').eraser( 'reset' ); // revert back to original content
*
* $('#image').eraser( 'size', 80 ); // change the eraser size
*
* $('#image').eraser( 'enable/disable' ); // enable or disable erasing
*
* $('#image').eraser( 'enabled' ); // returns whether the eraser is enabled
*
*
* https://github.com/boblemarin/jQuery.eraser
* http://minimal.be/lab/jQuery.eraser/
*
* Copyright (c) 2010 boblemarin emeric@minimal.be http://www.minimal.be
*
* Permission is hereby granted, free of charge, to any person
* obtaining a copy of this software and associated documentation
* files (the "Software"), to deal in the Software without
* restriction, including without limitation the rights to use,
* copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the
* Software is furnished to do so, subject to the following
* conditions:
*
* The above copyright notice and this permission notice shall be
* included in all copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
* OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
* HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
* WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
* OTHER DEALINGS IN THE SOFTWARE.
*/

(function($){
  var methods = {

    init: function(options) {
      return this.each(function(){
        var $this = $(this),
            data = $this.data('eraser');

        if (!data) {

          var handleImage = function() {
            var $canvas = $('<canvas/>'),
                canvas = $canvas.get(0),
                ctx = canvas.getContext('2d'),

                // calculate scale ratio for high DPI devices
                // http://www.html5rocks.com/en/tutorials/canvas/hidpi/
                devicePixelRatio = window.devicePixelRatio || 1,
                backingStoreRatio = ctx.webkitBackingStorePixelRatio ||
                    ctx.mozBackingStorePixelRatio ||
                    ctx.msBackingStorePixelRatio ||
                    ctx.oBackingStorePixelRatio ||
                    ctx.backingStorePixelRatio || 1,
                scaleRatio = devicePixelRatio / backingStoreRatio,

                realWidth = $this.width(),
                realHeight = $this.height(),
                width = realWidth * scaleRatio,
                height = realHeight * scaleRatio,
                pos = $this.offset(),
                enabled = (options && options.enabled === false) ? false : true,
                size = ((options && options.size) ? options.size : 40) * scaleRatio,
                completeRatio = (options && options.completeRatio) ? options.completeRatio : .7,
                completeFunction = (options && options.completeFunction) ? options.completeFunction : null,
                progressFunction = (options && options.progressFunction) ? options.progressFunction : null,
                zIndex = $this.css('z-index') == "auto"?1:$this.css('z-index'),
                parts = [],
                colParts = Math.floor(width / size),
                numParts = colParts * Math.floor(height / size),
                n = numParts,
                that = $this[0];

            // replace target with canvas
            $this.after($canvas);
            canvas.id = that.id;
            canvas.className = that.className;
            canvas.width = width;
            canvas.height = height;
            canvas.style.width = realWidth.toString() + "px";
            canvas.style.height = realHeight.toString() + "px";
            ctx.drawImage(that, 0, 0, width, height);
            $this.remove();

            // prepare context for drawing operations
            ctx.globalCompositeOperation = 'destination-out';
            ctx.strokeStyle = 'rgba(255,0,0,255)';
            ctx.lineWidth = size;

            ctx.lineCap = 'round';
            // bind events
            $canvas.bind('mousedown.eraser', methods.mouseDown);
            $canvas.bind('touchstart.eraser', methods.touchStart);
            $canvas.bind('touchmove.eraser', methods.touchMove);
            $canvas.bind('touchend.eraser', methods.touchEnd);

            // reset parts
            while(n--) parts.push(1);

            // store values
            data = {
              posX: pos.left,
              posY: pos.top,
              touchDown: false,
              touchID: -999,
              touchX: 0,
              touchY: 0,
              ptouchX: 0,
              ptouchY: 0,
              canvas: $canvas,
              ctx: ctx,
              w: width,
              h: height,
              scaleRatio: scaleRatio,
              source: that,
              size: size,
              parts: parts,
              colParts: colParts,
              numParts: numParts,
              ratio: 0,
              enabled: enabled,
              complete: false,
              completeRatio: completeRatio,
              completeFunction: completeFunction,
              progressFunction: progressFunction,
              zIndex: zIndex
            };
            $canvas.data('eraser', data);

            // listen for resize event to update offset values
            $(window).resize(function() {
              var pos = $canvas.offset();
              data.posX = pos.left;
              data.posY = pos.top;
            });
          }

          if (this.complete && this.naturalWidth > 0) {
            handleImage();
          } else {
            //this.onload = handleImage;
            $this.load(handleImage);
          }
        }
      });
    },

    touchStart: function(event) {
      var $this = $(this),
          data = $this.data('eraser');

      if (!data.touchDown) {
        var t = event.originalEvent.changedTouches[0],
            tx = t.pageX - data.posX,
            ty = t.pageY - data.posY;
        tx *= data.scaleRatio;
        ty *= data.scaleRatio;

        if (data.enabled) {
          methods.evaluatePoint(data, tx, ty);
        }

        data.touchDown = true;
        data.touchID = t.identifier;
        data.touchX = tx;
        data.touchY = ty;
        event.preventDefault();
      }
    },

    touchMove: function(event) {
      var $this = $(this),
          data = $this.data('eraser');

      if (data.touchDown) {
        var ta = event.originalEvent.changedTouches,
            n = ta.length;
        while (n--) {
          if (ta[n].identifier == data.touchID) {
            var tx = ta[n].pageX - data.posX,
                ty = ta[n].pageY - data.posY;
            tx *= data.scaleRatio;
            ty *= data.scaleRatio;

            if (data.enabled) {
              methods.evaluatePoint(data, tx, ty);
              data.ctx.beginPath();
              data.ctx.moveTo(data.touchX, data.touchY);
              data.ctx.lineTo(tx, ty);
              data.ctx.stroke();
              $this.css({"z-index":$this.css('z-index')==data.zIndex?parseInt(data.zIndex)+1:data.zIndex});
            }

            data.touchX = tx;
            data.touchY = ty;

            event.preventDefault();
            break;
          }
        }
      }
    },

    touchEnd: function(event) {
      var $this = $(this),
        data = $this.data('eraser');

      if ( data.touchDown ) {
        var ta = event.originalEvent.changedTouches,
          n = ta.length;
        while( n-- ) {
          if ( ta[n].identifier == data.touchID ) {
            data.touchDown = false;
            event.preventDefault();
            break;
          }
        }
      }
    },

    evaluatePoint: function(data, tx, ty) {
      if (!data.enabled) return;
      var p = Math.floor(tx/data.size) + Math.floor( ty / data.size ) * data.colParts;

      if ( p >= 0 && p < data.numParts ) {
        data.ratio += data.parts[p];
        data.parts[p] = 0;
        if (!data.complete) {
          p = data.ratio/data.numParts;
          if ( p >= data.completeRatio ) {
            data.complete = true;
            if ( data.completeFunction != null ) data.completeFunction();
          } else {
            if ( data.progressFunction != null ) data.progressFunction(p);
          }
        }
      }

    },

    mouseDown: function(event) {
      var $this = $(this),
          data = $this.data('eraser'),
          tx = event.pageX - data.posX,
          ty = event.pageY - data.posY;
      tx *= data.scaleRatio;
      ty *= data.scaleRatio;

      data.touchDown = true;
      data.touchX = tx;
      data.touchY = ty;

      if (data.enabled) {
        methods.evaluatePoint( data, tx, ty );

        data.ctx.beginPath();
        data.ctx.moveTo(data.touchX-1, data.touchY);
        data.ctx.lineTo(data.touchX, data.touchY);
        data.ctx.stroke();
      }

      $this.bind('mousemove.eraser', methods.mouseMove);
      $(document).bind('mouseup.eraser', data, methods.mouseUp);
      event.preventDefault();
    },

    mouseMove: function(event) {
      var $this = $(this),
          data = $this.data('eraser'),
          tx = event.pageX - data.posX,
          ty = event.pageY - data.posY;
      tx *= data.scaleRatio;
      ty *= data.scaleRatio;

      if (data.enabled) {
        methods.evaluatePoint( data, tx, ty );
        data.ctx.beginPath();
        data.ctx.moveTo( data.touchX, data.touchY );
        data.ctx.lineTo( tx, ty );
        data.ctx.stroke();
        $this.css({"z-index":$this.css('z-index')==data.zIndex?parseInt(data.zIndex)+1:data.zIndex});
      }

      data.touchX = tx;
      data.touchY = ty;

      event.preventDefault();
    },

    mouseUp: function(event) {
      var data = event.data,
          $this = data.canvas;

      data.touchDown = false;
      $this.unbind('mousemove.eraser');
      $(document).unbind('mouseup.eraser');
      event.preventDefault();
    },

    clear: function() {
      var $this = $(this),
          data = $this.data('eraser');

      if (data) {
        data.ctx.clearRect(0, 0, data.w, data.h);
        var n = data.numParts;
        while(n--) data.parts[n] = 0;
        data.ratio = data.numParts;
        data.complete = true;
        if (data.completeFunction != null) data.completeFunction();
      }
    },

    enabled: function() {
      var $this = $(this),
          data = $this.data('eraser');

      if (data && data.enabled) {
        return true;
      }
      return false;
    },

    enable: function() {
      var $this = $(this),
          data = $this.data('eraser');

      if (data) {
        data.enabled = true;
      }
    },

    disable: function() {
      var $this = $(this),
          data = $this.data('eraser');

      if (data) {
        data.enabled = false;
      }
    },

    size: function(value) {
      var $this = $(this),
          data = $this.data('eraser');

      if (data && value) {
        data.size = value;
        data.ctx.lineWidth = value;
      }
    },

    reset: function() {
      var $this = $(this),
          data = $this.data('eraser');

      if (data) {
        data.ctx.globalCompositeOperation = 'source-over';
        data.ctx.drawImage( data.source, 0, 0, data.w, data.h);
        data.ctx.globalCompositeOperation = 'destination-out';
        var n = data.numParts;
        while (n--) data.parts[n] = 1;
        data.ratio = 0;
        data.complete = false;
        data.touchDown = false;
      }
    },

    progress: function() {
      var $this = $(this),
          data = $this.data('eraser');

      if (data) {
        return data.ratio/data.numParts;
      }
      return 0;
    }

  };

  $.fn.eraser = function(method) {
    if (methods[method]) {
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if (typeof method === 'object' || ! method) {
      return methods.init.apply(this, arguments);
    } else {
      $.error('Method ' +  method + ' does not yet exist on jQuery.eraser');
    }
  };
})(jQuery);
(function(e){var t=typeof self=="object"&&self.self===self&&self||typeof global=="object"&&global.global===global&&global;if(typeof define==="function"&&define.amd){define([],function(){return t.Backendless=e(t)})}else if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=t.Backendless=e(t)}else{t.Backendless=e(t)}})(function(root){"use strict";var NodeDevice={name:"NODEJS",platform:"NODEJS",uuid:"someId",version:"1"};var isBrowser=new Function("try {return this===window;}catch(e){ return false;}")();var WebSocket=null;var UIState=null;var previousBackendless=root.Backendless;var Backendless={},emptyFn=function(){};Backendless.VERSION="3.1.6";Backendless.serverURL="https://api.backendless.com";Backendless.noConflict=function(){root.Backendless=previousBackendless;return this};if(!Array.prototype.indexOf){Array.prototype.indexOf=function(e,t){var n;if(this==null){throw new TypeError('"this" is null or not defined')}var s=Object(this);var r=s.length>>>0;if(r===0){return-1}var a=+t||0;if(Math.abs(a)===Infinity){a=0}if(a>=r){return-1}n=Math.max(a>=0?a:r-Math.abs(a),0);while(n<r){if(n in s&&s[n]===e){return n}n++}return-1}}initXHR();var browser=function(){var e=isBrowser?navigator.userAgent.toLowerCase():"NodeJS",t=/(chrome)[ \/]([\w.]+)/.exec(e)||/(webkit)[ \/]([\w.]+)/.exec(e)||/(opera)(?:.*version|)[ \/]([\w.]+)/.exec(e)||/(msie) ([\w.]+)/.exec(e)||e.indexOf("compatible")<0&&/(mozilla)(?:.*? rv:([\w.]+)|)/.exec(e)||[],n={browser:t[1]||"",version:t[2]||"0"},s={};if(n.browser){s[n.browser]=true;s.version=n.version}return s}();var getNow=function(){return(new Date).getTime()};var promisesEnabled=false;Backendless.browser=browser;Backendless.enablePromises=enablePromises;Backendless.promisesEnabled=function(){return promisesEnabled};var Utils=Backendless.Utils={isObject:function(e){return e===Object(e)},isString:function(e){return Object.prototype.toString.call(e).slice(8,-1)==="String"},isNumber:function(e){return Object.prototype.toString.call(e).slice(8,-1)==="Number"},isFunction:function(e){return Object.prototype.toString.call(e).slice(8,-1)==="Function"},isBoolean:function(e){return Object.prototype.toString.call(e).slice(8,-1)==="Boolean"},isDate:function(e){return Object.prototype.toString.call(e).slice(8,-1)==="Date"}};Utils.isArray=Array.isArray||function(e){return Object.prototype.toString.call(e).slice(8,-1)==="Array"};Utils.addEvent=function(e,t,n){if(t.addEventListener){t.addEventListener(e,n,false)}else if(t.attachEvent){t.attachEvent("on"+e,n)}else{t[e]=n}};Utils.isEmpty=function(e){if(e==null){return true}if(Utils.isArray(e)||Utils.isString(e)){return e.length===0}for(var t in e){if(e.hasOwnProperty(t)&&e[t]!==undefined&&e[t]!==null){return false}}return true};Utils.removeEvent=function(e,t){if(t.removeEventListener){t.removeEventListener(e,null,false)}else if(t.detachEvent){t.detachEvent("on"+e,null)}else{t[e]=null}};function initXHR(){try{if(typeof XMLHttpRequest.prototype.sendAsBinary=="undefined"){XMLHttpRequest.prototype.sendAsBinary=function(e){var t=new ArrayBuffer(e.length);var n=new Uint8Array(t,0);for(var s=0;s<e.length;s++){n[s]=e.charCodeAt(s)&255}this.send(n)}}}catch(e){}}function tryParseJSON(e){try{return typeof e==="string"?JSON.parse(e):e}catch(t){return e}}Backendless.setUIState=function(e){if(e===undefined){throw new Error("UI state name must be defined or explicitly set to null")}else{UIState=e===null?null:e}};Backendless._ajax_for_browser=function(e){var t=["cacheOnly","remoteDataOnly","fromCacheOrRemote","fromRemoteOrCache","fromCacheAndRemote"],n={ignoreCache:function(e){return s(e)},cacheOnly:function(e){var t=Backendless.LocalCache.get(e.url.replace(/([^A-Za-z0-9])/g,"")),n={message:"error: cannot find data in Backendless.LocalCache",statusCode:404};if(t){e.isAsync&&e.asyncHandler.success(t);return t}else{if(e.isAsync){e.asyncHandler.fault(n)}else{throw n}}},remoteDataOnly:function(e){return s(e)},fromCacheOrRemote:function(e){var t=Backendless.LocalCache.get(e.url.replace(/([^A-Za-z0-9])/g,""));if(t){e.isAsync&&e.asyncHandler.success(t);return t}else{return s(e)}},fromRemoteOrCache:function(e){return s(e)},fromCacheAndRemote:function(e){var t={},n=Backendless.LocalCache.get(e.url.replace(/([^A-Za-z0-9])/g,"")),r={message:"error: cannot find data in Backendless.LocalCache",statusCode:404};t.remote=s(e);if(n){e.isAsync&&e.asyncHandler.success(n);t.local=n}else{if(e.isAsync){e.asyncHandler.fault(r)}else{throw r}}return t}},s=function(e){var t=new XMLHttpRequest,n=e.data?"application/json":"application/x-www-form-urlencoded",s;var r=function(e){var t=true;if(e.responseText){t=tryParseJSON(e.responseText)}return t};var a=function(e){var t={};try{t=JSON.parse(e.responseText)}catch(n){t.message=e.responseText}t.statusCode=e.status;t.message=t.message||"unknown error occurred";return t};var i=function(t){t=cloneObject(t);if(e.method=="GET"&&e.cacheActive){t.cachePolicy=e.cachePolicy;Backendless.LocalCache.set(e.urlBlueprint,t)}else if(Backendless.LocalCache.exists(e.urlBlueprint)){if(t===true||e.method=="DELETE"){t=undefined}else{t.cachePolicy=Backendless.LocalCache.getCachePolicy(e.urlBlueprint)}"___class"in t&&delete t["___class"];Backendless.LocalCache.set(e.urlBlueprint,t)}};var o=function(){return e.cacheActive&&e.cachePolicy.policy=="fromRemoteOrCache"&&Backendless.LocalCache.exists(e.urlBlueprint)};t.open(e.method,e.url,e.isAsync);t.setRequestHeader("Content-Type",n);t.setRequestHeader("application-id",Backendless.applicationId);t.setRequestHeader("secret-key",Backendless.secretKey);t.setRequestHeader("application-type","JS");if(currentUser!=null&&currentUser["user-token"]){t.setRequestHeader("user-token",currentUser["user-token"])}else if(Backendless.LocalCache.exists("user-token")){t.setRequestHeader("user-token",Backendless.LocalCache.get("user-token"))}if(UIState!==null){t.setRequestHeader("uiState",UIState)}if(e.isAsync){t.onreadystatechange=function(){if(t.readyState==4){if(t.status>=200&&t.status<300){s=r(t);i(s);e.asyncHandler.success&&e.asyncHandler.success(s)}else if(o()){e.asyncHandler.success&&e.asyncHandler.success(Backendless.LocalCache.get(e.urlBlueprint))}else{e.asyncHandler.fault&&e.asyncHandler.fault(a(t))}}}}t.send(e.data);if(e.isAsync){return t}else if(t.status>=200&&t.status<300){s=r(t);i(s);return s}else if(o()){return Backendless.LocalCache.get(e.urlBlueprint)}else{throw a(t)}};e.method=e.method||"GET";e.cachePolicy=e.cachePolicy||{policy:"ignoreCache"};e.isAsync=typeof e.isAsync=="boolean"?e.isAsync:false;e.cacheActive=e.method=="GET"&&t.indexOf(e.cachePolicy.policy)!=-1;e.urlBlueprint=e.url.replace(/([^A-Za-z0-9])/g,"");try{return n[e.cachePolicy.policy].call(this,e)}catch(r){throw r}};Backendless._ajax_for_nodejs=function(e){e.data=e.data||"";if(typeof e.data!=="string"){e.data=JSON.stringify(e.data)}e.asyncHandler=e.asyncHandler||{};e.isAsync=typeof e.isAsync=="boolean"?e.isAsync:false;var t=e.url.substr(0,e.url.indexOf("/",8)).substr(0,e.url.indexOf(":"));var n=t==="https";var s=e.url.substr(0,e.url.indexOf("/",8)).substr(e.url.indexOf("/")+2),r=s.substr(0,s.indexOf(":")==-1?s.length:s.indexOf(":")),a=s.indexOf(":")!=-1?parseInt(s.substr(s.indexOf(":")+1)):n?443:80;var i={host:r,port:a,method:e.method||"GET",path:e.url.substr(e.url.indexOf("/",8)),headers:{"Content-Length":e.data?Buffer.byteLength(e.data):0,"Content-Type":e.data?"application/json":"application/x-www-form-urlencoded","application-id":Backendless.applicationId,"secret-key":Backendless.secretKey,"application-type":"JS"}};var o="";if(currentUser!=null&&!!currentUser["user-token"]){i.headers["user-token"]=currentUser["user-token"]}if(!e.isAsync){throw new Error("Use Async type of request using Backendless with NodeJS. Add Backendless.Async(successCallback, errorCallback) as last argument")}var c=require(n?"https":"http");var l=c.request(i,function(t){t.setEncoding("utf8");t.on("data",function(e){o+=e});t.on("end",function(){var n=t.headers["content-type"];if(n&&n.indexOf("application/json")!==-1){o=tryParseJSON(o)}var s=e.asyncHandler[t.statusCode>=200&&t.statusCode<300?"success":"fault"];if(Utils.isFunction(s)){s(o)}})});l.on("error",function(t){e.asyncHandler.fault||(e.asyncHandler.fault=function(){});e.asyncHandler.fault(t)});l.write(e.data);return l.end()};Backendless._ajax=isBrowser?Backendless._ajax_for_browser:Backendless._ajax_for_nodejs;var getClassName=function(){if(this.prototype&&this.prototype.___class){return this.prototype.___class}if(Utils.isFunction(this)&&this.name){return this.name}var e=Utils.isFunction(this)?this.toString():this.constructor.toString(),t=e.match(/function\s+(\w+)/);return t&&t.length>1?t[1]:""};var encodeArrayToUriComponent=function(e){var t=[],n,s;for(n=0,s=e.length;n<s;++n){t.push(encodeURIComponent(e[n]))}return t.join(",")};var classWrapper=function(obj){var wrapper=function(obj){var wrapperName=null,Wrapper=null;for(var property in obj){if(obj.hasOwnProperty(property)){if(property==="___class"){wrapperName=obj[property];break}}}if(wrapperName){try{Wrapper=eval(wrapperName);obj=deepExtend(new Wrapper,obj)}catch(e){}}return obj};if(Utils.isObject(obj)&&obj!=null){if(Utils.isArray(obj)){for(var i=obj.length;i--;){obj[i]=wrapper(obj[i])}}else{obj=wrapper(obj)}}return obj};var deepExtend=function(e,t){for(var n in t){if(t[n]!==undefined&&t.hasOwnProperty(n)){e[n]=e[n]||{};e[n]=classWrapper(t[n]);if(e[n]&&e[n].hasOwnProperty(n)&&e[n][n]&&e[n][n].hasOwnProperty("__originSubID")){e[n][n]=classWrapper(e[n])}}}return e};var cloneObject=function(e){return Utils.isArray(e)?e.slice():deepExtend({},e)};var extractResponder=function(e){var t,n;for(t=0,n=e.length;t<n;++t){if(e[t]instanceof Async){return e[t]}}return null};var wrapAsync=function(e,t,n){var s=function(s){if(t){s=t.call(n,s)}e.success(s)};var r=function(t){e.fault(t)};return new Async(s,r)};function extendCollection(e,t){if(e.nextPage!=null){if(e.nextPage&&e.nextPage.split("/")[1]==Backendless.appVersion){e.nextPage=Backendless.serverURL+e.nextPage}e._nextPage=e.nextPage;e.nextPage=function(e){return t._load(this._nextPage,e)};if(promisesEnabled){e.nextPage=promisify(e.nextPage)}e.getPage=function(e,n,s){var r=this._nextPage.replace(/offset=\d+/gi,"offset="+e);if(!(n instanceof Async)){r=r.replace(/pagesize=\d+/gi,"pageSize="+n)}s=extractResponder(arguments);return t._load(r,s)};e.dataMapper=t}}function Async(e,t,n){if(!(t instanceof Function)){n=t;t=emptyFn}this.success=function(t){e&&e.call(n,t)};this.fault=function(e){t&&t.call(n,e)}}function setCache(){var e={},t="localStorage",n;e.enabled=false;e.exists=function(e){};e.set=function(e,t){};e.get=function(e){};e.remove=function(e){};e.clear=function(){};e.flushExpired=function(){};e.getCachePolicy=function(e){};e.getAll=function(){};e.serialize=function(e){return JSON.stringify(e)};e.deserialize=function(e){if(typeof e!="string"){return undefined}try{return JSON.parse(e)}catch(t){return e||undefined}};function s(){try{if(isBrowser&&(t in window&&window[t])){localStorage.setItem("localStorageTest",true);localStorage.removeItem("localStorageTest");return true}else{return false}}catch(e){return false}}if(s()){n=window[t];var r=function(){if(!("Backendless"in n)){n.setItem("Backendless",e.serialize({}))}};var a=function(e){var t=false;if(Object.prototype.toString.call(e).slice(8,-1)=="Object"){if("cachePolicy"in e&&"timeToLive"in e["cachePolicy"]&&e["cachePolicy"]["timeToLive"]!=-1&&"created"in e["cachePolicy"]){t=(new Date).getTime()-e["cachePolicy"]["created"]>e["cachePolicy"]["timeToLive"]}}return t};var i=function(e){if(Object.prototype.toString.call(e).slice(8,-1)=="Object"){if("cachePolicy"in e&&"timeToLive"in e["cachePolicy"]){e["cachePolicy"]["created"]=(new Date).getTime()}}};r();e.enabled=true;e.exists=function(t){return e.get(t)!==undefined};e.set=function(t,s){if(s===undefined){return e.remove(t)}r();var a=e.deserialize(n.getItem("Backendless"));i(s);a[t]=s;try{n.setItem("Backendless",e.serialize(a))}catch(o){a={};a[t]=s;n.setItem("Backendless",e.serialize(a))}return s};e.get=function(t){r();var s=e.deserialize(n.getItem("Backendless")),i=s[t],o=i;if(a(i)){delete s[t];n.setItem("Backendless",e.serialize(s));o=undefined}if(o&&o["cachePolicy"]){delete o["cachePolicy"]}return o};e.remove=function(t){var s;r();t=t.replace(/([^A-Za-z0-9-])/g,"");var a=e.deserialize(n.getItem("Backendless"));if(a.hasOwnProperty(t)){s=delete a[t]}n.setItem("Backendless",e.serialize(a));return s};e.clear=function(){n.setItem("Backendless",e.serialize({}))};e.getAll=function(){r();var t=e.deserialize(n.getItem("Backendless"));var s={};for(var a in t){if(t.hasOwnProperty(a)){s[a]=t[a];if(s[a]!==null&&s[a].hasOwnProperty("cachePolicy")){delete s[a]["cachePolicy"]}}}return s};e.flushExpired=function(){r();var t=e.deserialize(n.getItem("Backendless")),s;for(var i in t){if(t.hasOwnProperty(i)){s=t[i];if(a(s)){delete t[i];n.setItem("Backendless",e.serialize(t))}}}};e.getCachePolicy=function(t){r();var s=e.deserialize(n.getItem("Backendless"));var a=s[t];return a?a["cachePolicy"]:undefined}}return e}Backendless.LocalCache=setCache();if(Backendless.LocalCache.enabled){Backendless.LocalCache.flushExpired()}Backendless.Async=Async;function DataStore(e){this.model=Utils.isString(e)?function(){}:e;this.className=getClassName.call(e);if((typeof e).toLowerCase()==="string"){this.className=e}if(!this.className){throw"Class name should be specified"}this.restUrl=Backendless.appPath+"/data/"+this.className}DataStore.prototype={_extractQueryOptions:function(e){var t=[];if(typeof e.pageSize!="undefined"){if(e.pageSize<1||e.pageSize>100){throw new Error("PageSize can not be less then 1 or greater than 100")}t.push("pageSize="+encodeURIComponent(e.pageSize))}if(typeof e.offset!="undefined"){if(e.offset<0){throw new Error("Offset can not be less then 0")}t.push("offset="+encodeURIComponent(e.offset))}if(e.sortBy){if(Utils.isString(e.sortBy)){t.push("sortBy="+encodeURIComponent(e.sortBy))}else if(Utils.isArray(e.sortBy)){t.push("sortBy="+encodeArrayToUriComponent(e.sortBy))}}if(e.relationsDepth){if(Utils.isNumber(e.relationsDepth)){t.push("relationsDepth="+Math.floor(e.relationsDepth))}}if(e.relations){if(Utils.isArray(e.relations)){t.push("loadRelations="+(e.relations.length?encodeArrayToUriComponent(e.relations):"*"))}}return t.join("&")},_parseResponse:function(e){var t=this.model,n;e=e.fields||e;n=new t;extendCollection(e,this);deepExtend(n,e);return this._formCircDeps(n)},_parseFindResponse:function(e){var t,n,s=this.model,r;if(e.data){var a=e,i=a.data;for(t=0,n=i.length;t<n;++t){i[t]=i[t].fields||i[t];r=new s;deepExtend(r,i[t]);i[t]=r}extendCollection(a,this);return this._formCircDeps(a)}else{e=e.fields||e;r=Utils.isString(s)?{}:new s;deepExtend(r,e);return this._formCircDeps(r)}},_load:function(e,t){if(e){var n=extractResponder(arguments),s=false;if(n!=null){s=true;n=wrapAsync(n,this._parseResponse,this)}var r=Backendless._ajax({method:"GET",url:e,isAsync:s,asyncHandler:n});return s?r:this._parseResponse(r)}},_replCircDeps:function(e){var t=[e];var n;var s=function(){for(var e="",t=e;t++<36;e+=t*51&&52?(t^15?8^Math.random()*(t^20?16:4):4).toString(16):"-"){}return e};var r=function(e){for(var a in e){if(e.hasOwnProperty(a)&&typeof e[a]=="object"&&e[a]!=null){if((n=t.indexOf(e[a]))!=-1){t[n]["__subID"]=t[n]["__subID"]||s();e[a]={__originSubID:t[n]["__subID"]}}else if(Utils.isDate(e[a])){e[a]=e[a].getTime()}else{t.push(e[a]);r(e[a])}}}};r(e)},_formCircDeps:function(e){var t={},n=new e.constructor,s=function(e,n){if(e.hasOwnProperty("__subID")){t[e["__subID"]]=n;delete e["__subID"]}for(var r in e){if(e.hasOwnProperty(r)){if(typeof e[r]=="object"&&e[r]!=null){if(e[r].hasOwnProperty("__originSubID")){n[r]=t[e[r]["__originSubID"]]}else{n[r]=new e[r].constructor;s(e[r],n[r])}}else{n[r]=e[r]}}}};s(e,n);return n},save:function(e,t){this._replCircDeps(e);var n=extractResponder(arguments),s=false,r="PUT",a=this.restUrl,i=e;if(n!=null){s=true;n=wrapAsync(n,this._parseResponse,this)}var o=Backendless._ajax({method:r,url:a,data:JSON.stringify(e),isAsync:s,asyncHandler:n});if(!s){deepExtend(i,this._parseResponse(o))}return s?o:i},remove:function(e,t){if(!Utils.isObject(e)&&!Utils.isString(e)){throw new Error('Invalid value for the "value" argument. The argument must contain only string or object values')}var n=extractResponder(arguments),s=false;if(n!=null){s=true;n=wrapAsync(n,this._parseResponse,this)}var r;if(Utils.isString(e)||e.objectId){e=e.objectId||e;r=Backendless._ajax({method:"DELETE",url:this.restUrl+"/"+e,isAsync:s,asyncHandler:n})}else{r=Backendless._ajax({method:"DELETE",url:this.restUrl,data:JSON.stringify(e),isAsync:s,asyncHandler:n})}return s?r:this._parseResponse(r)},find:function(e){e=e||{};var t,n,s,r=[],a=this.restUrl,i=extractResponder(arguments),o=i!=null,c;if(e.properties&&e.properties.length){t="props="+encodeArrayToUriComponent(e.properties)}if(e.condition){n="where="+encodeURIComponent(e.condition)}if(e.options){s=this._extractQueryOptions(e.options)}i!=null&&(i=wrapAsync(i,this._parseFindResponse,this));s&&r.push(s);n&&r.push(n);t&&r.push(t);r=r.join("&");if(e.url){a+="/"+e.url}if(r){a+="?"+r}c=Backendless._ajax({method:"GET",url:a,isAsync:o,asyncHandler:i,cachePolicy:e.cachePolicy});return o?c:this._parseFindResponse(c)},_buildArgsObject:function(){var e={},t=arguments.length,n="";for(;t--;){n=Object.prototype.toString.call(arguments[t]).toLowerCase().match(/[a-z]+/g)[1];switch(n){case"number":e.options=e.options||{};e.options.relationsDepth=arguments[t];break;case"string":e.url=arguments[t];break;case"array":e.options=e.options||{};e.options.relations=arguments[t];break;case"object":if(arguments[t].hasOwnProperty("cachePolicy")){e.cachePolicy=arguments[t]["cachePolicy"]}break;default:break}}return e},findById:function(){var e;if(Utils.isString(arguments[0])){e=this._buildArgsObject.apply(this,arguments);if(!e.url){throw new Error('missing argument "object ID" for method findById()')}return this.find.apply(this,[e].concat(Array.prototype.slice.call(arguments)))}else if(Utils.isObject(arguments[0])){e=arguments[0];var t=extractResponder(arguments),n=this.restUrl,s=t!=null,r="/pk?";for(var a in e){r+=a+"="+e[a]+"&"}t!=null&&(t=wrapAsync(t,this._parseResponse,this));var i;if(getClassName.call(arguments[0])=="Object"){i=Backendless._ajax({method:"GET",url:n+r.replace(/&$/,""),isAsync:s,asyncHandler:t})}else{i=Backendless._ajax({method:"PUT",url:n,data:JSON.stringify(e),isAsync:s,asyncHandler:t})}return s?i:this._parseResponse(i)}else{throw new Error('Invalid value for the "value" argument. The argument must contain only string or object values')}},loadRelations:function(e){if(!e){throw new Error("missing object argument for method loadRelations()")}if(!Utils.isObject(e)){throw new Error('Invalid value for the "value" argument. The argument must contain only object values')}var t=arguments[0];var n=this.restUrl+"/relations";if(arguments[1]){if(Utils.isArray(arguments[1])){if(arguments[1][0]=="*"){n+="?relationsDepth="+arguments[1].length}else{n+="?loadRelations="+arguments[1][0]+"&relationsDepth="+arguments[1].length}}else{throw new Error('Invalid value for the "options" argument. The argument must contain only array values')}}var s=Backendless._ajax({method:"PUT",url:n,data:JSON.stringify(t)});deepExtend(e,s)},findFirst:function(){var e=this._buildArgsObject.apply(this,arguments);e.url="first";return this.find.apply(this,[e].concat(Array.prototype.slice.call(arguments)))},findLast:function(){var e=this._buildArgsObject.apply(this,arguments);e.url="last";return this.find.apply(this,[e].concat(Array.prototype.slice.call(arguments)))}};var dataStoreCache={};var persistence={save:function(e,t,n){var s=extractResponder(arguments),r=false;if(Utils.isString(e)){var a=Backendless.appPath+"/data/"+e;return Backendless._ajax({method:"POST",url:a,data:JSON.stringify(t),isAsync:r,asyncHandler:s})}if(Utils.isObject(e)){return new DataStore(e).save(e,t,n)}},getView:function(e,t,n,s,r){var a=extractResponder(arguments),i=a!=null;if(Utils.isString(e)){var o=Backendless.appPath+"/data/"+e;if(arguments.length>1&&!(arguments[1]instanceof Backendless.Async)){o+="?"}if(Utils.isString(t)){o+="where="+t}else{n=t;s=n}if(Utils.isNumber(n)){o+="&"+(new DataStore)._extractQueryOptions({pageSize:n})}if(Utils.isNumber(s)){o+="&"+(new DataStore)._extractQueryOptions({offset:s})}return Backendless._ajax({method:"GET",url:o,isAsync:i,asyncHandler:a})}else{throw new Error("View name is required string parameter")}},callStoredProcedure:function(e,t,n){var s=extractResponder(arguments),r=s!=null;if(Utils.isString(e)){var a=Backendless.appPath+"/data/"+e,i={};if(Utils.isObject(t)){i=JSON.stringify(t)}return Backendless._ajax({method:"POST",url:a,data:i,isAsync:r,asyncHandler:s})}else{throw new Error("Stored Procedure name is required string parameter")}},of:function(e){var t;if(Utils.isString(e)){if(e.toLowerCase()==="users"){throw new Error("Table 'Users' is not accessible through this signature. Use Backendless.Data.of( BackendlessUser.class ) instead")}t=e}else{t=getClassName.call(e)}var n=dataStoreCache[t];if(!n){n=new DataStore(e);dataStoreCache[t]=n}return n},describe:function(e,t){e=Utils.isString(e)?e:getClassName.call(e);var n=extractResponder(arguments),s=n!=null;return Backendless._ajax({method:"GET",url:Backendless.appPath+"/data/"+e+"/properties",isAsync:s,asyncHandler:n})}};function DataPermissions(){this.restUrl=Backendless.appPath+"/data";this.getRestUrl=function(e,t){return this.restUrl+"/"+encodeURIComponent(e.___class)+"/permissions/"+encodeURIComponent(t)+"/"+encodeURIComponent(e.objectId)};this.sendRequest=function(e,t,n,s,r,a){var i=extractResponder(arguments),o=i!=null,c={permission:s};if(!n.___class||!n.objectId){throw new Error('"dataObject.___class" and "dataObject.objectId" need to be specified')}if(e){c.user=e}else if(t){c.role=t}return Backendless._ajax({method:"PUT",url:this.getRestUrl(n,r),data:JSON.stringify(c),isAsync:o,asyncHandler:i})}}DataPermissions.prototype={FIND:{grantUser:function(e,t,n){return Backendless.Data.Permissions.sendRequest(e,null,t,"FIND","GRANT",n)},grantRole:function(e,t,n){return Backendless.Data.Permissions.sendRequest(null,e,t,"FIND","GRANT",n)},grant:function(e,t){return Backendless.Data.Permissions.sendRequest("*",null,e,"FIND","GRANT",t)},denyUser:function(e,t,n){return Backendless.Data.Permissions.sendRequest(e,null,t,"FIND","DENY",n)},denyRole:function(e,t,n){return Backendless.Data.Permissions.sendRequest(null,e,t,"FIND","DENY",n)},deny:function(e,t){return Backendless.Data.Permissions.sendRequest("*",null,e,"FIND","DENY",t)}},REMOVE:{grantUser:function(e,t,n){return Backendless.Data.Permissions.sendRequest(e,null,t,"REMOVE","GRANT",n)},grantRole:function(e,t,n){return Backendless.Data.Permissions.sendRequest(null,e,t,"REMOVE","GRANT",n)},grant:function(e,t){return Backendless.Data.Permissions.sendRequest("*",null,e,"REMOVE","GRANT",t)},denyUser:function(e,t,n){return Backendless.Data.Permissions.sendRequest(e,null,t,"REMOVE","DENY",n)},denyRole:function(e,t,n){return Backendless.Data.Permissions.sendRequest(null,e,t,"REMOVE","DENY",n)},deny:function(e,t){return Backendless.Data.Permissions.sendRequest("*",null,e,"REMOVE","DENY",t)}},UPDATE:{grantUser:function(e,t,n){return Backendless.Data.Permissions.sendRequest(e,null,t,"UPDATE","GRANT",n)},grantRole:function(e,t,n){return Backendless.Data.Permissions.sendRequest(null,e,t,"UPDATE","GRANT",n)},grant:function(e,t){return Backendless.Data.Permissions.sendRequest("*",null,e,"UPDATE","GRANT",t)},denyUser:function(e,t,n){return Backendless.Data.Permissions.sendRequest(e,null,t,"UPDATE","DENY",n)},denyRole:function(e,t,n){return Backendless.Data.Permissions.sendRequest(null,e,t,"UPDATE","DENY",n)},deny:function(e,t){return Backendless.Data.Permissions.sendRequest("*",null,e,"UPDATE","DENY",t)}}};function User(){}User.prototype.___class="Users";Backendless.User=User;var currentUser=null;var UserService=function(){this.restUrl=Backendless.appPath+"/users"};UserService.prototype={_wrapAsync:function(e,t){var n=this,s=function(s){currentUser=n._parseResponse(tryParseJSON(s),t);e.success(n._getUserFromResponse(currentUser))},r=function(t){e.fault(t)};return new Async(s,r)},_parseResponse:function(e,t){var n=new Backendless.User;deepExtend(n,e);if(t){Backendless.LocalCache.set("stayLoggedIn",t)}return n},register:function(e,t){if(!(e instanceof Backendless.User)){throw new Error("Only Backendless.User accepted")}var n=extractResponder(arguments);var s=n!=null;if(n){n=this._wrapAsync(n)}var r=Backendless._ajax({method:"POST",url:this.restUrl+"/register",isAsync:s,asyncHandler:n,data:JSON.stringify(e)});return s?r:this._parseResponse(r)},getUserRoles:function(e){var t=extractResponder(arguments);var n=t!=null;if(t){t=this._wrapAsync(t)}var s=Backendless._ajax({method:"GET",url:this.restUrl+"/userroles",isAsync:n,asyncHandler:t});return n?s:this._parseResponse(s)},roleHelper:function(e,t,n,s){if(!e){throw new Error("Username can not be empty")}if(!t){throw new Error("Rolename can not be empty")}var r=extractResponder(arguments);var a=r!=null;if(r){r=this._wrapAsync(r)}var i={user:e,roleName:t};return Backendless._ajax({method:"POST",url:this.restUrl+"/"+s,isAsync:a,asyncHandler:r,data:JSON.stringify(i)})},assignRole:function(e,t,n){return this.roleHelper(e,t,n,"assignRole")},unassignRole:function(e,t,n){return this.roleHelper(e,t,n,"unassignRole")},login:function(e,t,n,s){if(!e){throw new Error("Username can not be empty")}if(!t){throw new Error("Password can not be empty")}n=n===true;Backendless.LocalCache.remove("user-token");Backendless.LocalCache.remove("current-user-id");Backendless.LocalCache.set("stayLoggedIn",false);var r=extractResponder(arguments);var a=r!=null;if(r){r=this._wrapAsync(r,n)}var i={login:e,password:t};var o=Backendless._ajax({method:"POST",url:this.restUrl+"/login",isAsync:a,asyncHandler:r,data:JSON.stringify(i)});if(!a&&o){currentUser=this._parseResponse(o,n);o=this._getUserFromResponse(currentUser)}return o},_getUserFromResponse:function(e){Backendless.LocalCache.set("current-user-id",e.objectId);var t=new Backendless.User;for(var n in e){if(e.hasOwnProperty(n)){if(n=="user-token"){if(Backendless.LocalCache.get("stayLoggedIn")){Backendless.LocalCache.set("user-token",e[n])}continue}t[n]=e[n]}}return t},loggedInUser:function(){return Backendless.LocalCache.get("current-user-id")},describeUserClass:function(e){var t=extractResponder(arguments);var n=t!=null;return Backendless._ajax({method:"GET",url:this.restUrl+"/userclassprops",isAsync:n,asyncHandler:t})},restorePassword:function(e,t){if(!e){throw"Username can not be empty"}var n=extractResponder(arguments);var s=n!=null;return Backendless._ajax({method:"GET",url:this.restUrl+"/restorepassword/"+encodeURIComponent(e),isAsync:s,asyncHandler:n})},logout:function(e){var t=extractResponder(arguments),n=t!=null,s=n?t.fault:null,r=n?t.success:null,a={},i=function(){Backendless.LocalCache.remove("user-token");Backendless.LocalCache.remove("current-user-id");Backendless.LocalCache.remove("stayLoggedIn");currentUser=null},o=function(){i();if(Utils.isFunction(r)){r()}},c=function(e){if(Utils.isObject(e)&&[3064,3091,3090,3023].indexOf(e.code)!=-1){i()}if(Utils.isFunction(s)){s(e)}};if(t){t.fault=c;t.success=o}try{a=Backendless._ajax({method:"GET",url:this.restUrl+"/logout",isAsync:n,asyncHandler:t})}catch(l){c(l)}if(n){return a}else{i()}},getCurrentUser:function(){if(currentUser){return this._getUserFromResponse(currentUser)}var e=Backendless.LocalCache.get("stayLoggedIn");var t=e&&Backendless.LocalCache.get("current-user-id");return t&&persistence.of(User).findById(t)||null},update:function(e,t){var n=extractResponder(arguments);var s=n!=null;if(n){n=this._wrapAsync(n)}var r=Backendless._ajax({method:"PUT",url:this.restUrl+"/"+e.objectId,isAsync:s,asyncHandler:n,data:JSON.stringify(e)});return s?r:this._parseResponse(r)},loginWithFacebook:function(e,t,n,s){this._loginSocial("Facebook",e,t,n,null,s)},loginWithGooglePlus:function(e,t,n,s,r){this._loginSocial("GooglePlus",e,t,n,s,r)},loginWithTwitter:function(e,t,n){this._loginSocial("Twitter",e,null,t,null,n)},_socialContainer:function(e,t){var n;if(t){var s;t=t[0];n=document.createElement("div");n.innerHTML="Loading...";t.appendChild(n);t.style.cursor="wait";this.closeContainer=function(){t.style.cursor="default";t.removeChild(s)};this.removeLoading=function(){t.removeChild(n)};this.doAuthorizationActivity=function(e){this.removeLoading();s=document.createElement("iframe");s.frameBorder=0;s.width=t.style.width;s.height=t.style.height;s.id="SocialAuthFrame";s.setAttribute("src",e+"&amp;output=embed");t.appendChild(s);s.onload=function(){t.style.cursor="default"}}}else{t=window.open("",e+" authorization","resizable=yes, scrollbars=yes, titlebar=yes, top=10, left=10");n=t.document.getElementsByTagName("body")[0].innerHTML;n="Loading...";t.document.getElementsByTagName("html")[0].style.cursor="wait";this.closeContainer=function(){t.close()};this.removeLoading=function(){n=null};this.doAuthorizationActivity=function(e){t.location.href=e;t.onload=function(){t.document.getElementsByTagName("html")[0].style.cursor="default"}}}},_loginSocial:function(e,t,n,s,r,a){var i=new this._socialContainer(e,r);var o=extractResponder(arguments);if(o){o=this._wrapAsync(o)}Utils.addEvent("message",window,function(e){if(e.origin==Backendless.serverURL){var t=JSON.parse(e.data);if(t.fault){o.fault(t.fault)}else{Backendless.LocalCache.set("stayLoggedIn",!!a);currentUser=this.Backendless.UserService._parseResponse(t);o.success(this.Backendless.UserService._getUserFromResponse(currentUser))}Utils.removeEvent("message",window);i.closeContainer()}});var c=new Backendless.Async(function(e){i.doAuthorizationActivity(e)},function(e){i.closeContainer();o.fault(e)});var l={};l.fieldsMapping=t||{};l.permissions=n||[];Backendless._ajax({method:"POST",url:this.restUrl+"/social/oauth/"+e.toLowerCase()+"/request_url",isAsync:true,asyncHandler:c,data:JSON.stringify(l)})},loginWithFacebookSdk:function(e,t,n){if(!FB){throw new Error("Facebook SDK not found")}if(t instanceof Async){n=t;t=false}var s=this;FB.getLoginStatus(function(r){if(r.status==="connected"){s._sendSocialLoginRequest(s,r,"facebook",e,t,n)}else{FB.login(function(r){s._sendSocialLoginRequest(s,r,"facebook",e,t,n)})}})},loginWithGooglePlusSdk:function(e,t,n){if(!gapi){throw new Error("Google Plus SDK not found")}if(t instanceof Async){n=t;t=false}var s=this;gapi.auth.authorize({client_id:e.client_id,scope:"https://www.googleapis.com/auth/plus.login"},function(r){delete r["g-oauth-window"];s._sendSocialLoginRequest(s,r,"googleplus",e,t,n)})},_sendSocialLoginRequest:function(e,t,n,s,r,a){if(s){t["fieldsMapping"]=s}var i=new Backendless.Async(function(t){currentUser=e._parseResponse(t);Backendless.LocalCache.set("stayLoggedIn",!!r);a.success(e._getUserFromResponse(currentUser))},function(e){a.fault(e)});Backendless._ajax({method:"POST",url:e.restUrl+"/social/"+n+"/login/"+Backendless.applicationId,isAsync:true,asyncHandler:i,data:JSON.stringify(t)})},isValidLogin:function(e){var t=Backendless.LocalCache.get("user-token");var n=extractResponder(arguments);var s=n!=null;if(t){if(!e){try{var r=Backendless._ajax({method:"GET",url:Backendless.serverURL+"/"+Backendless.appVersion+"/users/isvalidusertoken/"+t});return!!r}catch(a){return false}}else{Backendless._ajax({method:"GET",url:Backendless.serverURL+"/"+Backendless.appVersion+"/users/isvalidusertoken/"+t,isAsync:s,asyncHandler:n&&this._wrapAsync(n)})}}else{var i=Backendless.UserService.getCurrentUser();if(s){setTimeout(function(){n[i?"success":"fault"]()},0)}else{return!!i}}}};function Geo(){this.restUrl=Backendless.appPath+"/geo";this.monitoringId=null}Geo.prototype={UNITS:{METERS:"METERS",KILOMETERS:"KILOMETERS",MILES:"MILES",YARDS:"YARDS",FEET:"FEET"},_parseResponse:function(e){var t=e.collection;extendCollection(t,this);return t},_load:function(e,t){var n=extractResponder(arguments),s=n!=null;var r=Backendless._ajax({method:"GET",url:e,isAsync:s,asyncHandler:n});
return s?r:this._parseResponse(r)},_findHelpers:{searchRectangle:function(e){var t=["nwlat="+e[0],"nwlon="+e[1],"selat="+e[2],"selon="+e[3]];return t.join("&")},latitude:function(e){return"lat="+e},longitude:function(e){return"lon="+e},metadata:function(e){return"metadata="+JSON.stringify(e)},units:function(e){return"units="+e},radius:function(e){return"r="+e},categories:function(e){e=Utils.isString(e)?[e]:e;return"categories="+encodeArrayToUriComponent(e)},includeMetadata:function(e){return"includemetadata="+e},pageSize:function(e){if(e<1||e>100){throw new Error("PageSize can not be less then 1 or greater than 100")}else{return"pagesize="+e}},offset:function(e){if(e<0){throw new Error("Offset can not be less then 0")}else{return"offset="+e}},relativeFindPercentThreshold:function(e){if(e<=0){throw new Error("Threshold can not be less then or equal 0")}else{return"relativeFindPercentThreshold="+e}},relativeFindMetadata:function(e){return"relativeFindMetadata="+encodeURIComponent(JSON.stringify(e))},condition:function(e){return"whereClause="+encodeURIComponent(e)},degreePerPixel:function(e){return"dpp="+e},clusterGridSize:function(e){return"clustergridsize="+e},geoFence:function(e){return"geoFence="+e}},addPoint:function(e,t){if(e.latitude===undefined||e.longitude===undefined){throw"Latitude or longitude not a number"}e.categories=e.categories||["Default"];e.categories=Utils.isArray(e.categories)?e.categories:[e.categories];var n=extractResponder(arguments);var s=n!=null;var r=function(e){var t=function(t){var n=t.geopoint;var s=new GeoPoint;s.categories=n.categories;s.latitude=n.latitude;s.longitude=n.longitude;s.metadata=n.metadata;s.objectId=n.objectId;t.geopoint=s;e.success(t)};var n=function(t){e.fault(t)};return new Async(t,n)};n=r(n);return Backendless._ajax({method:"PUT",url:this.restUrl+"/points",data:JSON.stringify(e),isAsync:s,asyncHandler:n})},findUtil:function(e,t){var n=e["url"],s=extractResponder(arguments),r=false;if(e.searchRectangle&&e.radius){throw new Error("Inconsistent geo query. Query should not contain both rectangle and radius search parameters.")}else if(e.radius&&(e.latitude===undefined||e.longitude===undefined)){throw new Error("Latitude and longitude should be provided to search in radius")}else if((e.relativeFindMetadata||e.relativeFindPercentThreshold)&&!(e.relativeFindMetadata&&e.relativeFindPercentThreshold)){throw new Error("Inconsistent geo query. Query should contain both relativeFindPercentThreshold and relativeFindMetadata or none of them")}else{n+=e.searchRectangle?"/rect?":"/points?";n+=e.units?"units="+e.units:"";for(var a in e){if(e.hasOwnProperty(a)&&this._findHelpers.hasOwnProperty(a)&&e[a]!=null){n+="&"+this._findHelpers[a](e[a])}}}n=n.replace(/\?&/g,"?");var i=this;var o=function(t){var n=function(n){var s=n.collection.data;for(var r=0;r<s.length;r++){var a=null;if(s[r].hasOwnProperty("totalPoints")){a=new GeoCluster;a.totalPoints=s[r].totalPoints;a.geoQuery=e}else{a=new GeoPoint}a.categories=s[r].categories;a.latitude=s[r].latitude;a.longitude=s[r].longitude;a.metadata=s[r].metadata;a.objectId=s[r].objectId;a.distance=s[r].distance;n.collection.data[r]=a}n=i._parseResponse(n);t.success(n)};var s=function(e){t.fault(e)};return new Async(n,s)};if(s!=null){r=true}s=o(s);var c=Backendless._ajax({method:"GET",url:n,isAsync:r,asyncHandler:s});return r?c:this._parseResponse(c)},find:function(e,t){e["url"]=this.restUrl;return this.findUtil(e,t)},loadMetadata:function(e,t){var n=this.restUrl+"/points/",s=extractResponder(arguments),r=false;if(e.objectId){if(e instanceof GeoCluster){if(e.geoQuery instanceof GeoQuery){n+=e.objectId+"/metadata?";for(var a in e.geoQuery){if(e.geoQuery.hasOwnProperty(a)&&this._findHelpers.hasOwnProperty(a)&&e.geoQuery[a]!=null){n+="&"+this._findHelpers[a](e.geoQuery[a])}}}else{throw new Error("Invalid GeoCluster object. Make sure to obtain an instance of GeoCluster using the Backendless.Geo.find API")}}else if(e instanceof GeoPoint){n+=e.objectId+"/metadata"}else{throw new Error("Method argument must be a valid instance of GeoPoint or GeoCluster persisted on the server")}}else{throw new Error("Method argument must be a valid instance of GeoPoint or GeoCluster persisted on the server")}if(s!=null){r=true}return Backendless._ajax({method:"GET",url:n,isAsync:r,asyncHandler:s})},getClusterPoints:function(e,t){var n=this.restUrl+"/clusters/",s=extractResponder(arguments),r=false;if(e.objectId){if(e instanceof GeoCluster){if(e.geoQuery instanceof GeoQuery){n+=e.objectId+"/points?";for(var a in e.geoQuery){if(e.geoQuery.hasOwnProperty(a)&&this._findHelpers.hasOwnProperty(a)&&e.geoQuery[a]!=null){n+="&"+this._findHelpers[a](e.geoQuery[a])}}}else{throw new Error("Invalid GeoCluster object. Make sure to obtain an instance of GeoCluster using the Backendless.Geo.find API")}}else{throw new Error("Method argument must be a valid instance of GeoCluster persisted on the server")}}else{throw new Error("Method argument must be a valid instance of GeoCluster persisted on the server")}var i=this;var o=function(e){var t=function(t){var n=t.collection.data;for(var s=0;s<n.length;s++){var r=null;r=new GeoPoint;r.categories=n[s].categories;r.latitude=n[s].latitude;r.longitude=n[s].longitude;r.metadata=n[s].metadata;r.objectId=n[s].objectId;t.collection.data[s]=r}t=i._parseResponse(t);e.success(t)};var n=function(t){e.fault(t)};return new Async(t,n)};if(s!=null){r=true}s=o(s);var c=Backendless._ajax({method:"GET",url:n,isAsync:r,asyncHandler:s});return r?c:this._parseResponse(c)},relativeFind:function(e,t){if(!(e.relativeFindMetadata&&e.relativeFindPercentThreshold)){throw new Error("Inconsistent geo query. Query should contain both relativeFindPercentThreshold and relativeFindMetadata")}else{e["url"]=this.restUrl+"/relative";return this.findUtil(e,t)}},addCategory:function(e,t){if(!e){throw new Error("Category name is required.")}var n=extractResponder(arguments);var s=n!=null;var r=Backendless._ajax({method:"PUT",url:this.restUrl+"/categories/"+e,isAsync:s,asyncHandler:n});return typeof r.result==="undefined"?r:r.result},getCategories:function(e){var t=extractResponder(arguments);var n=t!=null;return Backendless._ajax({method:"GET",url:this.restUrl+"/categories",isAsync:n,asyncHandler:t})},deleteCategory:function(e,t){if(!e){throw new Error("Category name is required.")}var n=extractResponder(arguments);var s=n!=null;var r={};try{r=Backendless._ajax({method:"DELETE",url:this.restUrl+"/categories/"+e,isAsync:s,asyncHandler:n})}catch(a){if(a.statusCode==404){r=false}else{throw a}}return typeof r.result==="undefined"?r:r.result},deletePoint:function(e,t){if(!e||Utils.isFunction(e)){throw new Error("Point argument name is required, must be string (object Id), or point object")}var n=Utils.isString(e)?e:e.objectId,s=extractResponder(arguments),r=s!=null,a={};try{a=Backendless._ajax({method:"DELETE",url:this.restUrl+"/points/"+n,isAsync:r,asyncHandler:s})}catch(i){if(i.statusCode==404){a=false}else{throw i}}return typeof a.result==="undefined"?a:a.result},getFencePoints:function(e,t,n){t=t||new GeoQuery;if(!Utils.isString(e)){throw new Error("Invalid value for parameter 'geoFenceName'. Geo Fence Name must be a String")}if(!(t instanceof GeoQuery)){throw new Error("Invalid geo query. Query should be instance of Backendless.GeoQuery")}t["geoFence"]=e;t["url"]=this.restUrl;return this.findUtil(t,n)},_runFenceAction:function(e,t,n,s){if(!Utils.isString(t)){throw new Error("Invalid value for parameter 'geoFenceName'. Geo Fence Name must be a String")}if(n&&!(n instanceof Backendless.Async)&&!(n instanceof GeoPoint)&&!n.objectId){throw new Error("Method argument must be a valid instance of GeoPoint persisted on the server")}var r=extractResponder(arguments),a=r!=null,i={method:"POST",url:this.restUrl+"/fence/"+e+"?geoFence="+t,isAsync:a,asyncHandler:r};if(n){i.data=JSON.stringify(n)}return Backendless._ajax(i)},runOnStayAction:function(e,t,n){return this._runFenceAction("onstay",e,t,n)},runOnExitAction:function(e,t,n){return this._runFenceAction("onexit",e,t,n)},runOnEnterAction:function(e,t,n){return this._runFenceAction("onenter",e,t,n)},_getFences:function(e){return Backendless._ajax({method:"GET",url:this.restUrl+"/fences"+(e?"?geoFence="+e:"")})},EARTH_RADIUS:6378100,_distance:function(e,t,n,s){var r=t-s;r=r*Math.PI/180;e=e*Math.PI/180;n=n*Math.PI/180;return this.EARTH_RADIUS*Math.acos(Math.sin(e)*Math.sin(n)+Math.cos(e)*Math.cos(n)*Math.cos(r))},_updateDegree:function(e){e+=180;while(e<0){e+=360}return e===0?180:e%360-180},_countLittleRadius:function(e){var t=Math.abs(e)/180*this.EARTH_RADIUS;var n=2*this.EARTH_RADIUS;var s=(Math.pow(n,2)-n*Math.sqrt(Math.pow(n,2)-4*Math.pow(t,2)))/2;return n/2-Math.sqrt(s-Math.pow(t,2))},_isDefiniteRect:function(e,t){return e!=null&&t!=null},_getOutRectangle:function(){return arguments.length==1?this._getOutRectangleNodes(arguments[1]):this._getOutRectangleCircle(arguments[0],arguments[1])},_getOutRectangleCircle:function(e,t){var n=this._distance(e.latitude,e.longitude,t.latitude,t.longitude);var s=e.latitude+180*n/(Math.PI*this.EARTH_RADIUS)*(e.latitude>0?1:-1);var r=this._countLittleRadius(s);var a,i,o,c;if(r>n){a=e.longitude-180*n/r;i=2*e.longitude-a;a=this._updateDegree(a);i=i%360==180?180:this._updateDegree(i)}else{a=-180;i=180}if(e.latitude>0){o=s;c=2*e.latitude-s}else{c=s;o=2*e.latitude-s}return[Math.min(o,90),a,Math.max(c,-90),i]},_getOutRectangleNodes:function(e){var t=e[0].latitude;var n=e[0].longitude;var s=e[0].latitude;var r=e[0].longitude;var a=0,i=0,o=0;for(var c=1;c<e.length;c++){if(e[c].latitude>t){t=e[c].latitude}if(e[c].latitude<s){s=e[c].latitude}var l=e[c].latitude-e[c-1].latitude;if(l<0&&l>-180||l>270){if(l>270){l-=360}o+=l;if(o<a){a=o}}else if(l>0&&l<=180||l<=-270){if(l<=-270){l+=360}o+=l;if(o>i){i=o}}}n+=a;r+=i;if(r-n>=360){r=180;n=-180}else{r=this._updateDegree(r);n=this._updateDegree(n)}return[t,n,s,r]},_getPointPosition:function(e,t,n){var s=n.longitude-t.longitude;if(s<0&&s>-180||s>180){var r=t;t=n;n=r}if(e.latitude<t.latitude==e.latitude<n.latitude){return"NO_INTERSECT"}var a=e.longitude-t.longitude;if(a<0&&a>-180||a>180){a=(a-360)%360}var i=(n.longitude-t.longitude+360)%360;var o=i*(e.latitude-t.latitude)/(n.latitude-t.latitude)-a;if(o>0){return"INTERSECT"}return"NO_INTERSECT"},_isPointInRectangular:function(e,t,n){if(e.latitude>t.latitude||e.latitude<n.latitude){return false}if(t.longitude>n.longitude){return e.longitude>=t.longitude||e.longitude<=n.longitude}else{return e.longitude>=t.longitude&&e.longitude<=n.longitude}},_isPointInCircle:function(e,t,n){return this._distance(e.latitude,e.longitude,t.latitude,t.longitude)<=n},_isPointInShape:function(e,t){var n=0;function s(e,t){return(e+1)%t.length}for(var r=0;r<t.length;r++){var a=this._getPointPosition(e,t[r],t[s(r,t)]);switch(a){case"INTERSECT":{n++;break}case"ON_LINE":case"NO_INTERSECT":default:break}}return n%2==1},_isPointInFence:function(e,t){return this._isPointInRectangular(e,t.nwPoint,t.sePoint)||t.type=="CIRCLE"&&this._isPointInCircle(e,t.nodes[0],this._distance(t.nodes[0].latitude,t.nodes[0].longitude,t.nodes[1].latitude,t.nodes[1].longitude))||t.type=="SHAPE"&&this._isPointInShape(e,t.nodes)},_typesMapper:{RECT:function(e){e.nwPoint=e.nodes[0];e.sePoint=e.nodes[1]},CIRCLE:function(e,t){var n=t._getOutRectangle(e.nodes[0],e.nodes[1]);e.nwPoint={latitude:n[0],longitude:n[1]};e.sePoint={latitude:n[2],longitude:n[3]}},SHAPE:function(e,t){var n=t._getOutRectangle(e.nodes[0],e.nodes[1]);e.nwPoint={latitude:n[0],longitude:n[1]};e.sePoint={latitude:n[2],longitude:n[3]}}},_maxDuration:5e3,_timers:{},_checkPosition:function(e,t,n,s,r,a,i){var o=this;for(var c=0;c<o._trackedFences.length;c++){var l=o._isDefiniteRect(o._trackedFences[c].nwPoint,o._trackedFences[c].sePoint)&&o._isPointInFence(t,o._trackedFences[c]);var u=null;if(l!=a[o._trackedFences[c].geofenceName]){if(a[o._trackedFences[c].geofenceName]){u="onexit"}else{u="onenter"}a[o._trackedFences[c].geofenceName]=l}if(u){var d=o._trackedFences[c].onStayDuration*1e3,f=function(e,t,n){var s=function(){r["onstay"](o._trackedFences[e].geofenceName,o._trackedFences[e].objectId,t.latitude,t.longitude)};o._timers[o._trackedFences[e].geofenceName]=setTimeout(s,n)},h=function(e,t,n,s){var r=function(){o._runFenceAction("onstay",o._trackedFences[e].geofenceName,s,i)};o._timers[o._trackedFences[e].geofenceName]=setTimeout(r,n)};if(r){if(u=="onenter"){r[u](o._trackedFences[c].geofenceName,o._trackedFences[c].objectId,t.latitude,t.longitude);if(d>-1){(function(e,t,n){return f(e,t,n)})(c,t,d)}else{r["onstay"](o._trackedFences[c].geofenceName,o._trackedFences[c].objectId,t.latitude,t.longitude)}}else{clearTimeout(o._timers[o._trackedFences[c].geofenceName]);r[u](o._trackedFences[c].geofenceName,o._trackedFences[c].objectId,t.latitude,t.longitude)}}else if(s){s.latitude=t.latitude;s.longitude=t.longitude;if(u=="onenter"){o._runFenceAction(u,o._trackedFences[c].geofenceName,s,i);if(d>-1){(function(e,t,n,s){return h(e,t,n,s)})(c,t,d,s)}else{o._runFenceAction("onstay",o._trackedFences[c].geofenceName,s,i)}}else{clearTimeout(o._timers[o._trackedFences[c].geofenceName]);o._runFenceAction(u,o._trackedFences[c].geofenceName,s,i)}}}}},_mobilecheck:function(){var e=false;(function(t){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(t)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(t.substr(0,4))){e=true}})(navigator.userAgent||navigator.vendor||window.opera);return e},_trackedFences:[],_lastResults:{},_startMonitoring:function(e,t,n){var s=this;var r=false;if(t instanceof GeoPoint){r=true}var a=this._getFences(e);for(var i=0;i<a.length;i++){if(!o(s._trackedFences,a[i],"geofenceName")){s._typesMapper[a[i].type](a[i],s);s._lastResults[a[i].geofenceName]=false;s._trackedFences.push(a[i])}else{}}function o(e,t,n){var s=e.length,r=false;for(var a=0;a<s;a++){if(r=e[a][n]===t[n]){break}}return r}function c(i){s._checkPosition(e,i.coords,a,r?t:null,!r?t:null,s._lastResults,n)}function l(e){throw new Error("Error during current position calculation. Error "+e.message)}function u(){navigator.geolocation.getCurrentPosition(c,l,{timeout:5e3,enableHighAccuracy:true})}if(!this.monitoringId){if(a.length){this.monitoringId=!this._mobilecheck()?setInterval(u,s._maxDuration):navigator.geolocation.watchPosition(c,l,{timeout:s._maxDuration,enableHighAccuracy:true})}else{throw new Error("Please, add some fences to start monitoring")}}},startGeofenceMonitoringWithInAppCallback:function(e,t,n){this._startMonitoring(e,t,n)},startGeofenceMonitoringWithRemoteCallback:function(e,t,n){this._startMonitoring(e,t,n)},stopGeofenceMonitoring:function(e){var t=this;if(e){for(var n=0;n<t._trackedFences.length;n++){if(t._trackedFences[n].geofenceName==e){t._trackedFences.splice(n,1);delete t._lastResults[e]}}}else{this._lastResuls={};this._trackedFences=[]}if(!t._trackedFences.length){t.monitoringId=null;!t._mobilecheck()?clearInterval(t.monitoringId):navigator.geolocation.clearWatch(t.monitoringId)}}};function Proxy(){}Proxy.prototype={on:function(e,t){if(!e){throw new Error("Event name not specified")}if(!t){throw new Error("Handler not specified")}this.eventHandlers[e]=this.eventHandlers[e]||[];this.eventHandlers[e].push(t)},fireEvent:function(e,t){var n=this.eventHandlers[e]||[],s,r;for(r=0,s=n.length;r<s;++r){n[r](t)}}};function PollingProxy(e){this.eventHandlers={};this.restUrl=e;this.timer=0;this.timeout=0;this.interval=1e3;this.xhr=null;this.needReconnect=true;this.responder=new Async(this.onMessage,this.onError,this);this.poll()}PollingProxy.prototype=new Proxy;deepExtend(PollingProxy.prototype,{onMessage:function(e){clearTimeout(this.timeout);var t=this;this.timer=setTimeout(function(){t.poll()},this.interval);this.fireEvent("messageReceived",e)},poll:function(){var e=this;this.timeout=setTimeout(function(){e.onTimeout()},30*1e3);this.xhr=Backendless._ajax({method:"GET",url:this.restUrl,isAsync:true,asyncHandler:this.responder})},close:function(){clearTimeout(this.timer);clearTimeout(this.timeout);this.needReconnect=false;this.xhr&&this.xhr.abort()},onTimeout:function(){this.xhr&&this.xhr.abort()},onError:function(){clearTimeout(this.timer);clearTimeout(this.timeout);if(this.needReconnect){var e=this;this.xhr=null;this.timer=setTimeout(function(){e.poll()},this.interval)}}});function SocketProxy(e){var t=this;this.reconnectWithPolling=true;try{var n=this.socket=new WebSocket(e);n.onopen=function(){return t.sockOpen()};n.onerror=function(e){return t.sockError(e)};n.onclose=function(){t.onSocketClose()};n.onmessage=function(e){return t.onMessage(e)}}catch(s){setTimeout(function(){t.onSocketClose()},100)}}SocketProxy.prototype=new Proxy;deepExtend(SocketProxy.prototype,{onMessage:function(){this.fireEvent("messageReceived",data)},onSocketClose:function(e){if(this.reconnectWithPolling){this.fireEvent("socketClose",e)}},close:function(){this.reconnectWithPolling=false;this.socket.close()}});function Subscription(e){this.channelName=e.channelName;this.options=e.options;this.channelProperties=e.channelProperties;this.subscriptionId=null;this.restUrl=e.restUrl+"/"+e.channelName;this.responder=e.responder||emptyFn;this._subscribe(e.onSubscribe)}Subscription.prototype={_subscribe:function(e){var t=extractResponder(arguments);var n=t!=null;var s=this;var r=new Async(function(e){s.subscriptionId=e.subscriptionId;s._startSubscription()},function(e){t.fault(e)});var a=Backendless._ajax({method:"POST",url:this.restUrl+"/subscribe",isAsync:n,data:JSON.stringify(this.options),asyncHandler:r});if(!n){this.subscriptionId=a.subscriptionId;this._startSubscription()}},_startSubscription:function(){var e=this;if(WebSocket){var t=this.channelProperties["websocket"]+"/"+this.subscriptionId;this.proxy=new SocketProxy(t);this.proxy.on("socketClose",function(){e._switchToPolling()});this.proxy.on("messageReceived",function(){e.responder()})}else{this._switchToPolling()}this._startSubscription=emptyFn},cancelSubscription:function(){this.proxy&&this.proxy.close();this._startSubscription=emptyFn},_switchToPolling:function(){var e=this.restUrl+"/"+this.subscriptionId;this.proxy=new PollingProxy(e);var t=this;this.proxy.on("messageReceived",function(e){if(e.messages.length){t.responder(e)}})}};function Messaging(){this.restUrl=Backendless.appPath+"/messaging";this.channelProperties={}}Messaging.prototype={_getProperties:function(e,t){var n=extractResponder(arguments);var s=n!=null;var r=this.channelProperties[e];if(r){if(s){t.success(r)}return r}var a=Backendless._ajax({method:"GET",url:this.restUrl+"/"+e+"/properties",isAsync:s,asyncHandler:n});this.channelProperties[e]=a;return a},subscribe:function(e,t,n,s){var r=extractResponder(arguments);var a=r!=null;if(a){var i=this;var o=new Async(function(a){s.success(new Subscription({channelName:e,options:n,channelProperties:a,responder:t,restUrl:i.restUrl,onSubscribe:r}))},function(e){r.fault(e)});this._getProperties(e,o)}else{var c=this._getProperties(e);return new Subscription({channelName:e,options:n,channelProperties:c,responder:t,restUrl:this.restUrl})}},publish:function(e,t,n,s,r){var a=extractResponder(arguments);var i=a!=null;var o={message:t};if(n){if(!(n instanceof PublishOptions)){throw"Use PublishOption as publishOptions argument"}deepExtend(o,n)}if(s){if(!(s instanceof DeliveryOptions)){throw"Use DeliveryOptions as deliveryTarget argument"}deepExtend(o,s)}return Backendless._ajax({method:"POST",url:this.restUrl+"/"+e,isAsync:i,asyncHandler:a,data:JSON.stringify(o)})},sendEmail:function(e,t,n,s,r){var a=extractResponder(arguments);var i=a!=null;var o={};if(e&&!Utils.isEmpty(e)&&Utils.isString(e)){o.subject=e}else{throw"Subject is required parameter and must be a nonempty string"}if(t instanceof Bodyparts&&!Utils.isEmpty(t)){o.bodyparts=t}else{throw"Use Bodyparts as bodyParts argument, must contain at least one property"}if(n&&Utils.isArray(n)&&!Utils.isEmpty(n)){o.to=n}else{throw"Recipients is required parameter, must be a nonempty array"}if(s){if(Utils.isArray(s)){if(!Utils.isEmpty(s)){o.attachment=s}}else{throw"Attachments must be an array of file IDs from File Service"}}return Backendless._ajax({method:"POST",url:this.restUrl+"/email",isAsync:i,asyncHandler:a,data:JSON.stringify(o)})},cancel:function(e,t){var n=t!=null;return Backendless._ajax({method:"DELETE",url:this.restUrl+"/"+e,isAsync:n,asyncHandler:new Async(emptyFn)})},registerDevice:function(e,t,n){var s=extractResponder(arguments);var r=s!=null;var a=isBrowser?window.device:NodeDevice;var i={deviceToken:null,deviceId:a.uuid,os:a.platform,osVersion:a.version};if(Utils.isArray(e)){i.channels=e}for(var o=0,c=arguments.length;o<c;++o){var l=arguments[o];if(Utils.isNumber(l)||l instanceof Date){i.expiration=l instanceof Date?l.getTime()/1e3:l}}var u=this.restUrl+"/registrations";var d=function(e){i.deviceToken=e;Backendless._ajax({method:"POST",url:u,data:JSON.stringify(i),isAsync:r,asyncHandler:s})};var f=function(e){console.warn(JSON.stringify(["failed to register ",e]))};var h={projectid:"http://backendless.com",appid:Backendless.applicationId};cordova.exec(d,f,"PushNotification","registerDevice",[h])},getRegistrations:function(e){var t=isBrowser?window.device.uuid:NodeDevice.uuid;var n=extractResponder(arguments);var s=n!=null;return Backendless._ajax({method:"GET",url:this.restUrl+"/registrations/"+t,isAsync:s,asyncHandler:n})},unregisterDevice:function(e){var t=isBrowser?window.device.uuid:NodeDevice.uuid;var n=extractResponder(arguments);var s=n!=null;var r=Backendless._ajax({method:"DELETE",url:this.restUrl+"/registrations/"+t,isAsync:s,asyncHandler:n});try{cordova.exec(emptyFn,emptyFn,"PushNotification","unregisterDevice",[])}catch(a){console.log(a.message)}return r}};function getBuilder(e,t,n){var s="--",r="\r\n",a="";a+=s;a+=n;a+=r;a+='Content-Disposition: form-data; name="file"';a+='; filename="'+e+'"';a+=r;a+="Content-Type: application/octet-stream";a+=r;a+=r;a+=t;a+=r;a+=s;a+=n;a+=s;a+=r;return a}function send(e){var t=new XMLHttpRequest,n="-backendless-multipart-form-boundary-"+getNow(),s=getBuilder(this.fileName,e.target.result,n),r=function(e){var t={};try{t=JSON.parse(e.responseText)}catch(n){t.message=e.responseText}t.statusCode=e.status;return t};t.open("POST",this.uploadPath,true);t.setRequestHeader("content-type","multipart/form-data; boundary="+n);t.setRequestHeader("application-id",Backendless.applicationId);t.setRequestHeader("secret-key",Backendless.secretKey);t.setRequestHeader("application-type","JS");if(currentUser!=null&&currentUser["user-token"]){t.setRequestHeader("user-token",currentUser["user-token"])}else if(Backendless.LocalCache.exists("user-token")){t.setRequestHeader("user-token",Backendless.LocalCache.get("user-token"))}if(UIState!==null){t.setRequestHeader("uiState",UIState)}var a=this.asyncHandler;if(a){t.onreadystatechange=function(){if(t.readyState==4){if(t.status>=200&&t.status<300){a.success(JSON.parse(t.responseText))}else{a.fault(JSON.parse(t.responseText))}}}}t.sendAsBinary(s);if(a){return t}if(t.status>=200&&t.status<300){return t.responseText?JSON.parse(t.responseText):true}else{throw r(t)}}function sendEncoded(e){var t=new XMLHttpRequest,n="-backendless-multipart-form-boundary-"+getNow(),s=function(e){var t={};try{t=JSON.parse(e.responseText)}catch(n){t.message=e.responseText}t.statusCode=e.status;return t};t.open("PUT",this.uploadPath,true);t.setRequestHeader("Content-Type","text/plain");t.setRequestHeader("application-id",Backendless.applicationId);t.setRequestHeader("secret-key",Backendless.secretKey);t.setRequestHeader("application-type","JS");if(UIState!==null){t.setRequestHeader("uiState",UIState)}var r=this.asyncHandler;if(r){t.onreadystatechange=function(){if(t.readyState==4){if(t.status>=200&&t.status<300){r.success(JSON.parse(t.responseText))}else{r.fault(JSON.parse(t.responseText))}}}}t.send(e.target.result.split(",")[1]);if(r){return t}if(t.status>=200&&t.status<300){return t.responseText?JSON.parse(t.responseText):true}else{throw s(t)}}function FilePermissions(){this.restUrl=Backendless.appPath+"/files/permissions"}FilePermissions.prototype={grantUser:function(e,t,n,s){this.varType="user";this.id=e;return this.grant(t,n,s)},grantRole:function(e,t,n,s){this.varType="role";this.id=e;return this.grant(t,n,s)},grant:function(e,t,n){return this.sendRequest("GRANT",e,t,n)},denyUser:function(e,t,n,s){this.varType="role";this.id=e;return this.deny(t,n,s)},denyRole:function(e,t,n,s){this.varType="role";this.id=e;return this.deny(t,n,s)},deny:function(e,t,n){return this.sendRequest("DENY",e,t,n)},sendRequest:function(e,t,n,s){var r=extractResponder(arguments),a=r!=null,i={permission:n};i[this.varType]=this.id||"*";return Backendless._ajax({method:"PUT",url:this.restUrl+"/"+e+"/"+encodeURIComponent(t),data:JSON.stringify(i),isAsync:a,asyncHandler:r})}};function Files(){this.restUrl=Backendless.appPath+"/files"}Files.prototype={saveFile:function(e,t,n,s,r){if(!e||!Utils.isString(e)){throw new Error('Missing value for the "path" argument. The argument must contain a string value')}if(!t||!Utils.isString(e)){throw new Error('Missing value for the "fileName" argument. The argument must contain a string value')}if(s instanceof Backendless.Async){r=s;s=null}if(!(n instanceof File)){n=new Blob([n])}if(n.size>28e5){throw new Error("File Content size must be less than 2,800,000 bytes")}var a=this.restUrl+"/binary/"+e+(Utils.isString(t)?"/"+t:"")+(s?"?overwrite=true":"");try{var i=new FileReader;i.fileName=encodeURIComponent(t).replace(/'/g,"%27").replace(/"/g,"%22");i.uploadPath=a;i.onloadend=sendEncoded;if(r){i.asyncHandler=r}i.onerror=function(e){r.fault(e)};i.readAsDataURL(n);if(!r){return true}}catch(o){console.log(o)}},upload:function(e,t,n,s){e=e.files||e;var r=this.restUrl+"/"+t+"/";var a="";if(Utils.isBoolean(n)){a="?overwrite="+n}if(isBrowser){if(window.File&&window.FileList){if(e instanceof File){e=[e]}var i=0;for(var o=0,c=e.length;o<c;o++){try{var l=new FileReader;l.fileName=encodeURIComponent(e[o].name).replace(/'/g,"%27").replace(/"/g,"%22");l.uploadPath=r+l.fileName+a;l.onloadend=send;l.asyncHandler=s;l.onerror=function(e){s.fault(e)};l.readAsBinaryString(e[o])}catch(u){i++}}}else{var d=document.createElement("iframe");d.id=d.name="ifr"+getNow();d.width=d.height="0";document.body.appendChild(d);var f=document.createElement("form");f.target=d.name;f.enctype="multipart/form-data";f.method="POST";document.body.appendChild(f);f.appendChild(e);var h=encodeURIComponent(e.value).replace(/'/g,"%27").replace(/"/g,"%22"),p=h.lastIndexOf("\\");if(p){h=h.substring(p+1)}f.action=r+h+a;f.submit()}}else{throw"Upload File not supported with NodeJS"}},listing:function(e,t,n,s,r,a){var i=extractResponder(arguments),o=i!=null,c=this.restUrl+"/"+e;if(arguments.length>1&&!(arguments[1]instanceof Backendless.Async)){c+="?"}if(Utils.isString(t)){c+="pattern="+t}if(Utils.isBoolean(n)){c+="&sub="+n}if(Utils.isNumber(s)){c+="&pagesize="+s}if(Utils.isNumber(r)){c+="&offset="+r}return Backendless._ajax({method:"GET",url:c,isAsync:o,asyncHandler:i})},renameFile:function(e,t,n){this._checkPath(e);var s={oldPathName:e,newName:t};return this._doAction("rename",s,n)},moveFile:function(e,t,n){this._checkPath(e);this._checkPath(t);var s={sourcePath:e,targetPath:t};return this._doAction("move",s,n)},copyFile:function(e,t,n){this._checkPath(e);this._checkPath(t);var s={sourcePath:e,targetPath:t};return this._doAction("copy",s,n)},_checkPath:function(e){if(!/^\//.test(e)){e="/"+e}return e},_doAction:function(e,t,n){var s=extractResponder(arguments);var r=s!=null;return Backendless._ajax({method:"PUT",url:this.restUrl+"/"+e,data:JSON.stringify(t),isAsync:r,asyncHandler:s})},remove:function(e,t){var n=extractResponder(arguments);var s=n!=null;var r=e.indexOf("http://")===0||e.indexOf("https://")===0?e:this.restUrl+"/"+e;Backendless._ajax({method:"DELETE",url:r,isAsync:s,asyncHandler:n})},exists:function(e,t){if(!e||!Utils.isString(e)){throw new Error('Missing value for the "path" argument. The argument must contain a string value')}var n=extractResponder(arguments),s=n!=null,r=this.restUrl+"/exists/"+e;return Backendless._ajax({method:"GET",url:r,isAsync:s,asyncHandler:n})},removeDirectory:function(e,t){var n=extractResponder(arguments);var s=n!=null;return Backendless._ajax({method:"DELETE",url:this.restUrl+"/"+e,isAsync:s,asyncHandler:n})}};function Commerce(){this.restUrl=Backendless.appPath+"/commerce/googleplay"}Commerce.prototype.validatePlayPurchase=function(e,t,n,s){if(arguments.length<3){throw new Error("Package Name, Product Id, Token must be provided and must be not an empty STRING!")}for(var r=arguments.length-2;r>=0;r--){if(!arguments[r]||!Utils.isString(arguments[r])){throw new Error("Package Name, Product Id, Token must be provided and must be not an empty STRING!")}}var a=extractResponder(arguments),i=a!=null;if(a){a=wrapAsync(a)}return Backendless._ajax({method:"GET",url:this.restUrl+"/validate/"+e+"/inapp/"+t+"/purchases/"+n,isAsync:i,asyncHandler:a})};Commerce.prototype.cancelPlaySubscription=function(e,t,n,s){if(arguments.length<3){throw new Error("Package Name, Subscription Id, Token must be provided and must be not an empty STRING!")}for(var r=arguments.length-2;r>=0;r--){if(!arguments[r]||!Utils.isString(arguments[r])){throw new Error("Package Name, Subscription Id, Token must be provided and must be not an empty STRING!")}}var a=extractResponder(arguments),i=a!=null;if(a){a=wrapAsync(a)}return Backendless._ajax({method:"POST",url:this.restUrl+"/"+e+"/subscription/"+t+"/purchases/"+n+"/cancel",isAsync:i,asyncHandler:a})};Commerce.prototype.getPlaySubscriptionStatus=function(e,t,n,s){if(arguments.length<3){throw new Error("Package Name, Subscription Id, Token must be provided and must be not an empty STRING!")}for(var r=arguments.length-2;r>=0;r--){if(!arguments[r]||!Utils.isString(arguments[r])){throw new Error("Package Name, Subscription Id, Token must be provided and must be not an empty STRING!")}}var a=extractResponder(arguments),i=a!=null;if(a){a=wrapAsync(a)}return Backendless._ajax({method:"GET",url:this.restUrl+"/"+e+"/subscription/"+t+"/purchases/"+n,isAsync:i,asyncHandler:a})};function Events(){this.restUrl=Backendless.appPath+"/servercode/events"}Events.prototype.dispatch=function(e,t,n){
if(!e||!Utils.isString(e)){throw new Error("Event Name must be provided and must be not an empty STRING!")}t=Utils.isObject(t)?t:{};var s=extractResponder(arguments),r=s!=null;if(s){s=wrapAsync(s)}t=t instanceof Backendless.Async?{}:t;return Backendless._ajax({method:"POST",url:this.restUrl+"/"+e,data:JSON.stringify(t),isAsync:r,asyncHandler:s})};var Cache=function(){};var FactoryMethods={};Cache.prototype={put:function(e,t,n,s){if(!Utils.isString(e)){throw new Error("You can use only String as key to put into Cache")}if(!(n instanceof Backendless.Async)){if(typeof n=="object"&&!arguments[3]){s=n;n=null}else if(typeof n!=("number"||"string")&&n!=null){throw new Error("You can use only String as timeToLive attribute to put into Cache")}}else{s=n;n=null}if(Utils.isObject(t)&&t.constructor!==Object){t.___class=t.___class||getClassName.call(t)}var r=extractResponder([s]),a=false;if(r!=null){a=true;r=wrapAsync(r)}return Backendless._ajax({method:"PUT",url:Backendless.serverURL+"/"+Backendless.appVersion+"/cache/"+e+(n?"?timeout="+n:""),data:JSON.stringify(t),isAsync:a,asyncHandler:r})},expireIn:function(e,t,n){if(Utils.isString(e)&&(Utils.isNumber(t)||Utils.isDate(t))&&t){t=Utils.isDate(t)?t.getTime():t;var s=extractResponder(arguments),r=false;if(s!=null){r=true;s=wrapAsync(s)}return Backendless._ajax({method:"PUT",url:Backendless.serverURL+"/"+Backendless.appVersion+"/cache/"+e+"/expireIn?timeout="+t,data:JSON.stringify({}),isAsync:r,asyncHandler:s})}else{throw new Error('The "key" argument must be String. The "seconds" argument can be either Number or Date')}},expireAt:function(e,t,n){if(Utils.isString(e)&&(Utils.isNumber(t)||Utils.isDate(t))&&t){t=Utils.isDate(t)?t.getTime():t;var s=extractResponder(arguments),r=false;if(s!=null){r=true;s=wrapAsync(s)}return Backendless._ajax({method:"PUT",url:Backendless.serverURL+"/"+Backendless.appVersion+"/cache/"+e+"/expireAt?timestamp="+t,data:JSON.stringify({}),isAsync:r,asyncHandler:s})}else{throw new Error("You can use only String as key while expire in Cache. Second attribute must be declared and must be a Number or Date type")}},cacheMethod:function(e,t,n,s){if(!Utils.isString(t)){throw new Error('The "key" argument must be String')}var r=extractResponder(arguments),a=false;if(r!=null){a=true;r=wrapAsync(r)}return Backendless._ajax({method:e,url:Backendless.serverURL+"/"+Backendless.appVersion+"/cache/"+t+(n?"/check":""),isAsync:a,asyncHandler:r})},contains:function(e,t){return this.cacheMethod("GET",e,true,t)},get:function(e,t){if(!Utils.isString(e)){throw new Error('The "key" argument must be String')}function n(e){var t=e&&e.___class;if(t){var n=FactoryMethods[t]||root[t];if(n){e=new n(e)}}return e}var s=extractResponder(arguments),r=false;if(s!=null){r=true;s=wrapAsync(s,n,this)}var a=Backendless._ajax({method:"GET",url:Backendless.serverURL+"/"+Backendless.appVersion+"/cache/"+e,isAsync:r,asyncHandler:s});return r?a:n(a)},remove:function(e,t){return this.cacheMethod("DELETE",e,false,t)},setObjectFactory:function(e,t){FactoryMethods[e]=t}};var Counters=function(){};var AtomicInstance=function(e){this.name=e};Counters.prototype={of:function(e){return new AtomicInstance(e)},getConstructor:function(){return this},counterNameValidation:function(e){if(!e){throw new Error('Missing value for the "counterName" argument. The argument must contain a string value.')}if(!Utils.isString(e)){throw new Error('Invalid value for the "value" argument. The argument must contain only string values')}this.name=e},implementMethod:function(e,t,n){var s=extractResponder(arguments),r=false;if(s!=null){r=true;s=wrapAsync(s)}return Backendless._ajax({method:e,url:Backendless.serverURL+"/"+Backendless.appVersion+"/counters/"+this.name+t,isAsync:r,asyncHandler:s})},incrementAndGet:function(e,t){this.counterNameValidation(e,t);return this.implementMethod("PUT","/increment/get",t)},getAndIncrement:function(e,t){this.counterNameValidation(e,t);return this.implementMethod("PUT","/get/increment",t)},decrementAndGet:function(e,t){this.counterNameValidation(e,t);return this.implementMethod("PUT","/decrement/get",t)},getAndDecrement:function(e,t){this.counterNameValidation(e,t);return this.implementMethod("PUT","/get/decrement",t)},reset:function(e,t){this.counterNameValidation(e,t);return this.implementMethod("PUT","/reset",t)},get:function(e,t){this.counterNameValidation(e,t);var n=extractResponder(arguments),s=false;if(n!=null){s=true;n=wrapAsync(n)}return Backendless._ajax({method:"GET",url:Backendless.serverURL+"/"+Backendless.appVersion+"/counters/"+this.name,isAsync:s,asyncHandler:n})},implementMethodWithValue:function(e,t,n){if(!t){throw new Error('Missing value for the "value" argument. The argument must contain a numeric value.')}if(!Utils.isNumber(t)){throw new Error('Invalid value for the "value" argument. The argument must contain only numeric values')}var s=extractResponder(arguments),r=false;if(s!=null){r=true;s=wrapAsync(s)}return Backendless._ajax({method:"PUT",url:Backendless.serverURL+"/"+Backendless.appVersion+"/counters/"+this.name+e+(t?t:""),isAsync:r,asyncHandler:s})},addAndGet:function(e,t,n){this.counterNameValidation(e,n);return this.implementMethodWithValue("/get/incrementby?value=",t,n)},getAndAdd:function(e,t,n){this.counterNameValidation(e,n);return this.implementMethodWithValue("/incrementby/get?value=",t,n)},compareAndSet:function(e,t,n,s){this.counterNameValidation(e,s);if(!t||!n){throw new Error('Missing values for the "expected" and/or "updated" arguments. The arguments must contain numeric values')}if(!Utils.isNumber(t)||!Utils.isNumber(n)){throw new Error('Missing value for the "expected" and/or "updated" arguments. The arguments must contain a numeric value')}var r=extractResponder(arguments),a=false;if(r!=null){a=true;r=wrapAsync(r)}return Backendless._ajax({method:"PUT",url:Backendless.serverURL+"/"+Backendless.appVersion+"/counters/"+this.name+"/get/compareandset?expected="+(t&&n?t+"&updatedvalue="+n:""),isAsync:a,asyncHandler:r})}};AtomicInstance.prototype={incrementAndGet:function(e){return Counters.prototype.getConstructor().incrementAndGet(this.name,e)},getAndIncrement:function(e){return Counters.prototype.getConstructor().getAndIncrement(this.name,e)},decrementAndGet:function(e){return Counters.prototype.getConstructor().decrementAndGet(this.name,e)},getAndDecrement:function(e){return Counters.prototype.getConstructor().getAndDecrement(this.name,e)},reset:function(e){return Counters.prototype.getConstructor().reset(this.name,e)},get:function(e){return Counters.prototype.getConstructor().get(this.name,e)},addAndGet:function(e,t){return Counters.prototype.getConstructor().addAndGet(this.name,e,t)},getAndAdd:function(e,t){return Counters.prototype.getConstructor().getAndAdd(this.name,e,t)},compareAndSet:function(e,t,n){return Counters.prototype.getConstructor().getAndAdd(this.name,e,t,n)}};var lastFlushListeners;Backendless.Logging={restUrl:root.url,loggers:{},logInfo:[],messagesCount:0,numOfMessages:10,timeFrequency:1,getLogger:function(e){if(!Utils.isString(e)){throw new Error("Invalid 'loggerName' value. LoggerName must be a string value")}if(!this.loggers[e]){this.loggers[e]=new Logging(e)}return this.loggers[e]},flush:function(){var e=extractResponder(arguments);if(this.logInfo.length){this.flushInterval&&clearTimeout(this.flushInterval);var t;var n=function(e){return function(){for(var n=0;n<t.length;n++){t[n][e].apply(null,arguments)}if(t===lastFlushListeners){lastFlushListeners=null}}};if(e){t=lastFlushListeners=lastFlushListeners?lastFlushListeners.splice(0):[];t.push(e)}Backendless._ajax({method:"PUT",isAsync:!!e,asyncHandler:e&&new Async(n("success"),n("failure")),url:Backendless.serverURL+"/"+Backendless.appVersion+"/log",data:JSON.stringify(this.logInfo)});this.logInfo=[];this.messagesCount=0}else if(e){if(lastFlushListeners){lastFlushListeners.push(e)}else{setTimeout(e.success,0)}}},sendRequest:function(){var e=this;this.flushInterval=setTimeout(function(){e.flush(new Backendless.Async)},this.timeFrequency*1e3)},checkMessagesLen:function(){if(this.messagesCount>this.numOfMessages-1){this.sendRequest()}},setLogReportingPolicy:function(e,t){this.numOfMessages=e;this.timeFrequency=t;this.checkMessagesLen()}};function Logging(e){this.name=e}function setLogMessage(e,t,n,s){var r={};r["message"]=n;r["timestamp"]=Date.now();r["exception"]=s?s:null;r["logger"]=e;r["log-level"]=t;Backendless.Logging.logInfo.push(r);Backendless.Logging.messagesCount++;Backendless.Logging.checkMessagesLen()}Logging.prototype={debug:function(e){return setLogMessage(this.name,"DEBUG",e)},info:function(e){return setLogMessage(this.name,"INFO",e)},warn:function(e,t){return setLogMessage(this.name,"WARN",e,t)},error:function(e,t){return setLogMessage(this.name,"ERROR",e,t)},fatal:function(e,t){return setLogMessage(this.name,"FATAL",e,t)},trace:function(e){return setLogMessage(this.name,"TRACE",e)}};function CustomServices(){}CustomServices.prototype={invoke:function(e,t,n,s,r){var a=extractResponder(arguments),i=a!=null;return Backendless._ajax({method:"POST",url:Backendless.serverURL+"/"+Backendless.appVersion+"/services/"+e+"/"+t+"/"+n,data:JSON.stringify(s),isAsync:i,asyncHandler:a})}};function promisify(e){return function(){var t=this;var n=[].slice.call(arguments);return new Promise(function(s,r){n.push(new Async(s,r,t));e.apply(t,n)})}}function promisifyPack(e){var t=e[0];var n=e[1];n.forEach(function(e){t[e]=promisify(t[e])})}function enablePromises(){if(promisesEnabled){return}if(typeof Promise==="undefined"){throw new Error("Promises are not supported by your browser. "+'Please use "Backendless.Async" to make async requests, '+"or upgrade to a modern browser.\nSee "+"http://caniuse.com/#feat=promises")}promisesEnabled=true;[[DataPermissions.prototype.FIND,Object.keys(DataPermissions.prototype.FIND)],[DataPermissions.prototype.REMOVE,Object.keys(DataPermissions.prototype.REMOVE)],[DataPermissions.prototype.UPDATE,Object.keys(DataPermissions.prototype.UPDATE)],[Files.prototype,["saveFile","upload","listing","_doAction","remove","exists","removeDirectory"]],[Commerce.prototype,["validatePlayPurchase","cancelPlaySubscription","getPlaySubscriptionStatus"]],[Counters.prototype,["implementMethod","get","implementMethodWithValue","compareAndSet"]],[DataStore.prototype,["save","remove","find","findById","loadRelations"]],[Cache.prototype,["put","expireIn","expireAt","cacheMethod","get"]],[persistence,["describe","getView","callStoredProcedure"]],[FilePermissions.prototype,["sendRequest"]],[CustomServices.prototype,["invoke"]],[Events.prototype,["dispatch"]],[PollingProxy.prototype,["poll"]],[Backendless.Logging,["flush"]],[Messaging.prototype,["publish","sendEmail","cancel","subscribe","registerDevice","getRegistrations","unregisterDevice"]],[Geo.prototype,["addPoint","findUtil","loadMetadata","getClusterPoints","addCategory","getCategories","deleteCategory","deletePoint"]],[UserService.prototype,["register","getUserRoles","roleHelper","login","describeUserClass","restorePassword","logout","update","isValidLogin","loginWithFacebookSdk","loginWithGooglePlusSdk","loginWithFacebook","loginWithGooglePlus","loginWithTwitter"]]].forEach(promisifyPack);UserService.prototype.getCurrentUser=function(){if(currentUser){return Promise.resolve(this._getUserFromResponse(currentUser))}var e=Backendless.LocalCache.get("stayLoggedIn");var t=e&&Backendless.LocalCache.get("current-user-id");return t&&persistence.of(User).findById(t)||Promise.resolve(null)};UserService.prototype.isValidLogin=function(){var e=Backendless.LocalCache.get("user-token");if(e){return new Promise(function(t,n){return Backendless._ajax({method:"GET",url:Backendless.serverURL+"/"+Backendless.appVersion+"/users/isvalidusertoken/"+e,isAsync:true,asyncHandler:new Async(t,n)})})}return Backendless.UserService.getCurrentUser().then(function(e){return Promise.resolve(!!e)}).catch(function(){return Promise.resolve(false)})}}Backendless.initApp=function(e,t,n){Backendless.applicationId=e;Backendless.secretKey=t;Backendless.appVersion=n;Backendless.appPath=[Backendless.serverURL,Backendless.appVersion].join("/");Backendless.UserService=new UserService;Backendless.Users=Backendless.UserService;Backendless.Geo=new Geo;Backendless.Persistence=persistence;Backendless.Data=persistence;Backendless.Data.Permissions=new DataPermissions;Backendless.Messaging=new Messaging;Backendless.Files=new Files;Backendless.Files.Permissions=new FilePermissions;Backendless.Commerce=new Commerce;Backendless.Events=new Events;Backendless.Cache=new Cache;Backendless.Counters=new Counters;Backendless.CustomServices=new CustomServices;dataStoreCache={};currentUser=null};var DataQuery=function(){this.properties=[];this.condition=null;this.options=null;this.url=null};DataQuery.prototype={addProperty:function(e){this.properties=this.properties||[];this.properties.push(e)}};var GeoQuery=function(){this.searchRectangle=undefined;this.categories=[];this.includeMetadata=true;this.metadata=undefined;this.condition=undefined;this.relativeFindMetadata=undefined;this.relativeFindPercentThreshold=undefined;this.pageSize=undefined;this.latitude=undefined;this.longitude=undefined;this.radius=undefined;this.units=undefined;this.degreePerPixel=undefined;this.clusterGridSize=undefined};GeoQuery.prototype={addCategory:function(){this.categories=this.categories||[];this.categories.push()},setClusteringParams:function(e,t,n,s){s=s||0;var r=parseFloat(e),a=parseFloat(t),i=parseInt(n),o=parseInt(s);if(!isFinite(r)||r<-180||r>180){throw new Error("The westLongitude value must be a number in the range between -180 and 180")}if(!isFinite(a)||a<-180||a>180){throw new Error("The eastLongitude value must be a number in the range between -180 and 180")}if(!isFinite(i)||i<1){throw new Error("The mapWidth value must be a number greater or equal to 1")}if(!isFinite(o)||o<0){throw new Error("The clusterGridSize value must be a number greater or equal to 0")}var c=a-r;c<0&&(c+=360);this.degreePerPixel=c/i;this.clusterGridSize=o||null}};var GeoPoint=function(){this.___class="GeoPoint";this.categories=undefined;this.latitude=undefined;this.longitude=undefined;this.metadata=undefined;this.objectId=undefined};var GeoCluster=function(){this.categories=undefined;this.latitude=undefined;this.longitude=undefined;this.metadata=undefined;this.objectId=undefined;this.totalPoints=undefined;this.geoQuery=undefined};var PublishOptionsHeaders={MESSAGE_TAG:"message",IOS_ALERT_TAG:"ios-alert",IOS_BADGE_TAG:"ios-badge",IOS_SOUND_TAG:"ios-sound",ANDROID_TICKER_TEXT_TAG:"android-ticker-text",ANDROID_CONTENT_TITLE_TAG:"android-content-title",ANDROID_CONTENT_TEXT_TAG:"android-content-text",ANDROID_ACTION_TAG:"android-action",WP_TYPE_TAG:"wp-type",WP_TITLE_TAG:"wp-title",WP_TOAST_SUBTITLE_TAG:"wp-subtitle",WP_TOAST_PARAMETER_TAG:"wp-parameter",WP_TILE_BACKGROUND_IMAGE:"wp-backgroundImage",WP_TILE_COUNT:"wp-count",WP_TILE_BACK_TITLE:"wp-backTitle",WP_TILE_BACK_BACKGROUND_IMAGE:"wp-backImage",WP_TILE_BACK_CONTENT:"wp-backContent",WP_RAW_DATA:"wp-raw"};var PublishOptions=function(e){e=e||{};this.publisherId=e.publisherId||undefined;this.headers=e.headers||undefined;this.subtopic=e.subtopic||undefined};var DeliveryOptions=function(e){e=e||{};this.pushPolicy=e.pushPolicy||undefined;this.pushBroadcast=e.pushBroadcast||undefined;this.pushSinglecast=e.pushSinglecast||undefined;this.publishAt=e.publishAt||undefined;this.repeatEvery=e.repeatEvery||undefined;this.repeatExpiresAt=e.repeatExpiresAt||undefined};var Bodyparts=function(e){e=e||{};this.textmessage=e.textmessage||undefined;this.htmlmessage=e.htmlmessage||undefined};var SubscriptionOptions=function(e){e=e||{};this.subscriberId=e.subscriberId||undefined;this.subtopic=e.subtopic||undefined;this.selector=e.selector||undefined};Backendless.DataQuery=DataQuery;Backendless.GeoQuery=GeoQuery;Backendless.GeoPoint=GeoPoint;Backendless.GeoCluster=GeoCluster;Backendless.Bodyparts=Bodyparts;Backendless.PublishOptions=PublishOptions;Backendless.DeliveryOptions=DeliveryOptions;Backendless.SubscriptionOptions=SubscriptionOptions;Backendless.PublishOptionsHeaders=PublishOptionsHeaders;root.GeoPoint=Backendless.GeoPoint;root.GeoCluster=Backendless.GeoCluster;root.BackendlessGeoQuery=Backendless.GeoQuery;root.Bodyparts=Backendless.Bodyparts;root.PublishOptions=Backendless.PublishOptions;root.DeliveryOptions=Backendless.DeliveryOptions;root.SubscriptionOptions=Backendless.SubscriptionOptions;root.PublishOptionsHeaders=Backendless.PublishOptionsHeaders;return Backendless});


// Closes the Responsive Menu on Menu Item Click
$('.navbar-collapse ul li a').click(function() {
    $('.navbar-toggle:visible').click();
});
var s3 = (function(){
	var $parentContainer = $("#s3");
	var state = {};
	var userData = {};
	var isCurrent = false;

	function _initialize(){

		interact('#s3 canvas')
		  .draggable({
		    onmove: window.dragMoveListener
		  })
		  .resizable({
		    preserveAspectRatio: false,
		    edges: { left: true, right: true, bottom: true, top: true }
		  })
		  .on('resizemove', function (event) {
		    var target = event.target,
		        x = (parseFloat(target.getAttribute('data-x')) || 0),
		        y = (parseFloat(target.getAttribute('data-y')) || 0);

		    // update the element's style
		    target.style.width  = event.rect.width + 'px';
		    target.style.height = event.rect.height + 'px';

		    // translate when resizing from top or left edges
		    x += event.deltaRect.left;
		    y += event.deltaRect.top;

		    target.style.webkitTransform = target.style.transform =
		        'translate(' + x + 'px,' + y + 'px)';

		    target.setAttribute('data-x', x);
		    target.setAttribute('data-y', y);
		    target.textContent = Math.round(event.rect.width) + '×' + Math.round(event.rect.height);
		  });
		window.dragMoveListener = dragMoveListener;

	}

	function _render() {
		$parentContainer.find('.previous').on('click', function(e){
			_previousSlide(e);
		});

		$parentContainer.find('#toggleGrayScale').on('click', function(e){
			console.log(e);
			console.log($(this));
		});

		$("#s3 #confirms3").on('click', function(){
			$('#downloadBtn').removeClass('disabled').addClass('btn-success');
		});


		$('#downloadBtn').on('click',function(){
			saveSupporter();
			var bg = $("#s3 #placeholder").get(0);
		//	convertToGrayScale();
			var image = $("#s3 canvas#eraseImg").get(0);
			var ctx = document.getElementById('output').getContext('2d');

			var imageHeight = $("#s3 canvas#eraseImg").css("height");
			imageHeight = parseInt(imageHeight.substr(0, imageHeight.length -2));  // Extract px character
			var imageWidth = $("#s3 canvas#eraseImg").css("width");
			imageWidth = parseInt(imageWidth.substr(0, imageWidth.length -2));  // Extract px character
			var imageX = parseInt($('#s3 canvas#eraseImg').data("x")) || 0;
			var imageY = parseInt($('#s3 canvas#eraseImg').data("y")) || 0;

			// Set text


	        	ctx.drawImage(bg, 0,0, 600, 600);
	        	ctx.font = "30px Arial";
	        	ctx.fillStyle = 'black';
			ctx.strokeText(userData.userStatus,360,430);
			ctx.strokeText(userData.userName,360,400);

	        	ctx.drawImage(image, imageX,imageY, imageWidth, imageHeight);
	        downloadCanvas(this, 'output', 'test.png');
		});

	}

	function saveSupporter(){
		function Supporter(args) {
		    args = args || {};
		    this.name = args.name || "";
		    this.status = args.age || "";
		}
		var supporterObject = new Supporter({
			name: userData.userName,
			status: userData.userStatus,
		});
		Backendless.Persistence.of( Supporter ).save( supporterObject, new Backendless.Async(
			function(){
			console.log("Du30 for President!");
		}, function(){
			console.log("Oops");
		} ) );
	}

	function convertToGrayScale(){
		// var imgd = context.getImageData(0, 0, 500, 300);
		// var pix = imgd.data;
		// for (var i = 0, n = pix.length; i < n; i += 4) {
		// var grayscale = pix[i  ] * .3 + pix[i+1] * .59 + pix[i+2] * .11;
		// pix[i  ] = grayscale; 	// red
		// pix[i+1] = grayscale; 	// green
		// pix[i+2] = grayscale; 	// blue
		// // alpha
		// }
		// context.putImageData(imgd, 0, 0);
	}

	function downloadCanvas(link, canvasId, filename) {
		link.href = document.getElementById(canvasId).toDataURL();
		link.download = filename;
	}
	function dragMoveListener (event) {
	    var target = event.target,
	        // keep the dragged position in the data-x/data-y attributes
	        x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
	        y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

	    // translate the element
	    target.style.webkitTransform =
	    target.style.transform =
	      'translate(' + x + 'px, ' + y + 'px)';

	    // update the posiion attributes
	    target.setAttribute('data-x', x);
	    target.setAttribute('data-y', y);
	  }

	  function cloneCanvas(oldCanvas) {

	    //create a new canvas
	    var newCanvas = document.createElement('canvas');
	    var context = newCanvas.getContext('2d');

	    //set dimensions
	    newCanvas.width = oldCanvas.width;
	    newCanvas.height = oldCanvas.height;
	    //apply the old canvas to the new one
	    context.drawImage(oldCanvas, 0, 0);

	    //return the new canvas
	    return newCanvas;
	}

	function compileCanvas(){

	}
	function getStampNumber(){

	}

	function _previousSlide(e){
		slideHandler(e, 'previous');

		//save before go back
		userData.userImage = $parentContainer.find("#eraseImg");
		s2.setUserData( getUserData() );
		s2.setCurrent(true);
	}
	function _setUserData(data){
		userData = data;
	}

	function getUserData(){
		return userData;
	}
	return {
		initialize: _initialize,
		render: _render,
		setCurrent: function(iscurrent){
			isCurrent = iscurrent;
			this.setImage();
			_initialize();
		},
		setImage: function(){
			$image = userData.userImage;
			var placeholderText = $("span").text("hello world").css("font-size", 30).css('position',"absolute").css("bottom", "200").css("right", "200");
			$parentContainer.find('#resize-box').prepend(placeholderText);
			$parentContainer.find('#resize-box').append($image).attr("width", "600").attr('height', "600");
		},
		setPattern: function(){

		},
		startMove: function(){

		},
		endMove: function(){

		},
		startResize: function(){

		},
		endResize: function(){

		},
		setUserData: _setUserData,
		reset: function(){

		},
		download: function(){
			getStampNumber();
			compileCanvas();
			//redirect here
		},


	};
})();
var s2 = (function(){
	var $parentContainer = $("#s2");
	var state = {};
	var userData = {};
	var isCurrent = false;

	function _initialize(){
		_render();
	}

	function _render() {
		// Next Slider Listener
		$parentContainer.find('.next').on('click', function(e){
			_nextSlide(e);
		});
		$parentContainer.find('.previous').on('click', function(e){
			_previousSlide(e);
		});
		$parentContainer.find('.startBrush').on('click', function(){
			_startBrush( $(this).data('brush'));
		});
		$parentContainer.find('#eraserResetBtn').on('click', function(){
			$parentContainer.find("#erase-box").find('canvas').eraser('reset');
			_reset();
		});

		$parentContainer.find('#confirm').on('click', function(){
			_endBrush();
			userData.userImage = $parentContainer.find('#erase-box').find('canvas');
			$parentContainer.find('.next').removeClass("disabled").addClass('btn-success');
		});
	}

	function _nextSlide(e){
		slideHandler(e, 'next');
		s3.setUserData( userData);
		s3.setCurrent(true);
	}

	function _previousSlide(e){
		slideHandler(e, 'previous');
	}

	function _startBrush(size){
		var brushSize = (size !== 'undefined') ? size : 20;
		$parentContainer.find("#erase-box").find('canvas').eraser('enable');
		$parentContainer.find("#erase-box").find('canvas').eraser('size',brushSize);

	}
	function _reset(){
		$('eraseImg').eraser('reset');
	}
	function _setUserData (data){
		console.log("hey");
		userData = data;
	}

	function _endBrush(){
		$parentContainer.find("#erase-box").find('canvas').eraser('disable');
	}

	return {
		initialize: _initialize,

		setCurrent: function(iscurrent){
			isCurrent = iscurrent;
			this.setImage();

		},
		setImage: function(){
			if(  userData.userImage !== "undefined" ){
				var b=  userData.userImage.attr('src');
				$parentContainer.find('#eraseImg').attr('src', b).removeClass('hidden');
				$parentContainer.find("#erase-box").find('img').eraser();
				$parentContainer.find("#erase-box").find('canvas').eraser('disable');
			}
			else if( userData.userImage.is("canvas") ){
				console.log("is canvas");
			}
		},
		getUserData: function(){
			return userData;
		},
		setUserData: _setUserData,
		startBrush: _startBrush,
		reset: _reset,
		endBrush: _endBrush,

	};
})();
var s1 = (function(){
	var $parentContainer = $("#s1");
	var isCurrent = false;
	var state = {};
	var userData = {};

	function _initialize(data){
		isCurrent = true;
		userData = data;
		_render();
	}

	function _render(){
		// Upload Box listener
		$parentContainer.find("#upload-box").click(function(e){
		    $parentContainer.find('#uploadInput').trigger('click');
		});
		$parentContainer.find('#uploadInput').on('change', function(){
		     setUserImage(this, $parentContainer.find('#upload-box >img') );
			$parentContainer.find('.next').removeClass('disabled').addClass('btn-success');
		});

		// Next Slide Listener
		$parentContainer.find('.next').on('click', function(e){
			setUserName( $parentContainer.find('.username-input').val() );
			setUserStatus( $parentContainer.find('.userstatus-input').val() );
			_nextSlide(e);
		});
	}

	function _nextSlide(e){
		slideHandler(e, 'next');
		s2.setUserData( _getUserData() );
		s2.setCurrent(true);
	}

	function setUserImage(_inputelement, _imageelement){
		if (_inputelement.files && _inputelement.files[0]) {
		     var reader = new FileReader();

	        reader.onload = function (e) {
	            _imageelement.attr('src', e.target.result).removeClass('hidden');
	        };
	        reader.readAsDataURL(_inputelement.files[0]);
		}
		// Save the element to object
		userData.userImage = _imageelement;
	}

	function setUserName(_username){
		_username = _username.trim().split(" ");
		$.each(_username, function(index, item) {
		    _username[index] = item.charAt(0).toUpperCase() + item.substr(1).toLowerCase();
		});
		_username = _username.join(" ");
		// Save the name to object
		userData.userName = _username;
	}

	function setUserStatus(_userstatus){
		_userstatus = _userstatus.charAt(0).toUpperCase() + _userstatus.substr(1).toLowerCase();
		// Save the status to object
		userData.userStatus = _userstatus;
	}

	function _getUserData(){
		return userData;
	}

	return {
		nextSlide : _nextSlide,
		initialize: _initialize,
		getUserData: _getUserData,

		setCurrent: function(iscurrent){
			isCurrent = iscurrent;
		},
	};

})();

//# sourceMappingURL=libs/backendless.min.map


// (function($, window, document, undefined){
//  function dragMoveListener (event) {
//     var target = event.target,
//         // keep the dragged position in the data-x/data-y attributes
//         x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
//         y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

//     // translate the element
//     target.style.webkitTransform =
//     target.style.transform =
//       'translate(' + x + 'px, ' + y + 'px)';

//     // update the posiion attributes
//     target.setAttribute('data-x', x);
//     target.setAttribute('data-y', y);
//   }

//   function cloneCanvas(oldCanvas) {

//     //create a new canvas
//     var newCanvas = document.createElement('canvas');
//     var context = newCanvas.getContext('2d');

//     //set dimensions
//     newCanvas.width = oldCanvas.width;
//     newCanvas.height = oldCanvas.height;
//     //apply the old canvas to the new one
//     context.drawImage(oldCanvas, 0, 0);

//     //return the new canvas
//     return newCanvas;
// }

//   // this is used later in the resizing and gesture demos
//   window.dragMoveListener = dragMoveListener;

//             var workspace = {
//             	initialize: function() {

// 		        	interact('#workspace .crop-user-image')
// 						  .draggable({
// 						    onmove: window.dragMoveListener
// 						  })
// 						  .resizable({
// 						    preserveAspectRatio: true,
// 						    edges: { left: true, right: true, bottom: true, top: true }
// 						  })
// 						  .on('resizemove', function (event) {
// 						    var target = event.target,
// 						        x = (parseFloat(target.getAttribute('data-x')) || 0),
// 						        y = (parseFloat(target.getAttribute('data-y')) || 0);

// 						    // update the element's style
// 						    target.style.width  = event.rect.width + 'px';
// 						    target.style.height = event.rect.height + 'px';

// 						    // translate when resizing from top or left edges
// 						    x += event.deltaRect.left;
// 						    y += event.deltaRect.top;

// 						    target.style.webkitTransform = target.style.transform =
// 						        'translate(' + x + 'px,' + y + 'px)';

// 						    target.setAttribute('data-x', x);
// 						    target.setAttribute('data-y', y);
// 						    target.textContent = Math.round(event.rect.width) + '×' + Math.round(event.rect.height);
// 						  });
//             	},
//             	eraserStart: function(size){
//             		var brushSize = 20;
//             		if (size !== 'undefined') brushSize = size;

//         			$('.crop-user-image').eraser({
// 	          			progressFunction: function(p) {
// 	            			$('#progress').html(Math.round(p*100)+'%');
// 	          			}
// 	        		});
//         			$('.crop-user-image').eraser('enable');
//         			$('.crop-user-image').eraser('size',brushSize);
//             	},
//             	eraserEnd: function(){
//             		$('.crop-user-image').eraser('disable');
//             	},
//             	dragEnd: function() {
//             		interact('#workspace .crop-user-image').draggable(false);
//             		//interact('.crop-user-image').resizeable(false);
//             	},
//             	dragStart: function(){
//             		interact('#workspace .crop-user-image').draggable(true);
//             		//interact('.crop-user-image').resizeable(true);
//             	}
//             };

//             workspace.initialize();
//              // this is used later in the resizing and gesture demos


//             var move = false;
//             var crop = false;

//             function beforeStartAction (){
//             	workspace.dragEnd();
//             	move = false;
//             	workspace.eraserEnd();
//             	crop = false;
//             	$(".btn").removeClass('active');
//             }

//  			$('.btn-move').on('click', function(){
//  				if( !move ) {
//  					beforeStartAction();
//  					$(this).addClass('active');
//  					workspace.dragStart();
//  					move = true;
//  				}
//  				else {
//  					$(this).removeClass('active');
//  					move = false;
//  					workspace.dragEnd();
//  				}
//  			});
//  			$('#btn-crop').on('click', '.btn', function(){
//  				if( !crop ){
//  					beforeStartAction();
//  					$(this).addClass('active');
//  					var size = $(this).data('brush-size');
//  					workspace.eraserStart(size);
//  					crop = true;
//  				}
//  				else {
//  					$(this).removeClass('active');
//  					workspace.eraserEnd();
//  					crop = false;
//  				}
//  			});

// 			$('#btn-crop-done').on('click', function(){
// 			 	$('.crop-user-image').appendTo('#workspace');
// 			});

// 			function downloadCanvas(link, canvasId, filename) {
// 				link.href = document.getElementById(canvasId).toDataURL();
// 				link.download = filename;
// 			}

// 			$('.btn-save').on('click',function(){
// 				var bg = $("#workspace .background-image").get(0);
// 				var image = $("#workspace .crop-user-image").get(0);
// 				var ctx = document.getElementById('workspace2').getContext('2d');


// 		        ctx.drawImage(bg, 0,0);
// 		        ctx.drawImage(image, 0,0);
// 		        downloadCanvas(this, 'workspace2', 'test.png');
// 			});



// }(jQuery, window, document, undefined));


var APPLICATION_ID = 'CB821998-CA5A-D215-FF6C-60EF2ADD3200',
    SECRET_KEY = '22C19CCB-98AB-EDC0-FFB4-708F8E999300',
    VERSION = 'v1'; //default application version;
    Backendless.initApp(APPLICATION_ID, SECRET_KEY, VERSION);


    var currentSlideIndex = 0;
    var $stepContents = $('.step-content');
    var $navbarActive = $('#navbar li');

    function slideHandler(e, type){
        e.preventDefault();
        // Toggle Hidden Show
        $stepContents.addClass('hidden');
        $navbarActive.removeClass('active');
        if( type === 'previous'){
            if(currentSlideIndex !== 0) currentSlideIndex--;
        }
        else if(type === 'next'){
             if(currentSlideIndex !== 2) currentSlideIndex++;
        }
        $navbarActive.eq(currentSlideIndex).addClass('active');
        $stepContents.eq(currentSlideIndex).removeClass("hidden");

        // Animation here
    }

    s1.initialize({});
    s2.initialize({});
    s3.initialize({});
    s3.render();


