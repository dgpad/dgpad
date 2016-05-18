// Blockly.JavaScript['controls_whileUntil'] = function(block) {

//     var until = block.getFieldValue('MODE') == 'UNTIL';
//     var argument0 = Blockly.JavaScript.valueToCode(block, 'BOOL',
//         until ? Blockly.JavaScript.ORDER_LOGICAL_NOT :
//         Blockly.JavaScript.ORDER_NONE) || 'false';
//     var branch = Blockly.JavaScript.statementToCode(block, 'DO');
//     branch = Blockly.JavaScript.addLoopTrap(branch, block.id);
//     if (until) {
//         argument0 = '!' + argument0;
//     }
//     var cod = "setTimeout(function(){if (" + argument0 + ") {\n" + branch + "\nsetTimeout(arguments.callee,0)\n}\n},0);";
//     return cod;
// }

Blockly.JavaScript['controls_for'] = function(block) {
    var variable0 = "blockly_var_" + Blockly.JavaScript.variableDB_.getName(
        block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
    var argument0 = Blockly.JavaScript.valueToCode(block, 'FROM',
        Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';
    var argument1 = Blockly.JavaScript.valueToCode(block, 'TO',
        Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';
    var increment = Blockly.JavaScript.valueToCode(block, 'BY',
        Blockly.JavaScript.ORDER_ASSIGNMENT) || '1';
    var branch = Blockly.JavaScript.statementToCode(block, 'DO');
    branch = Blockly.JavaScript.addLoopTrap(branch, block.id);
    // console.log(branch);
    var code = "for (var " + variable0 + " = " + argument0 + " ; " + variable0 + " <= " + argument1 + " ; " + variable0 + " = " + variable0 + " + " + increment + "){\n";
    code += branch;
    code += "};\n";
    return code;
};


Blockly.JavaScript['controls_repeat_ext'] = function(block) {
    // Repeat n times.
    if (block.getField('TIMES')) {
        // Internal number.
        var repeats = String(Number(block.getFieldValue('TIMES')));
    } else {
        // External number.
        var repeats = Blockly.JavaScript.valueToCode(block, 'TIMES',
            Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';
    }
    var branch = Blockly.JavaScript.statementToCode(block, 'DO');
    branch = Blockly.JavaScript.addLoopTrap(branch, block.id);
    var loopVar = 'blockly_var_' + Blockly.JavaScript.variableDB_.getDistinctName(
        'count', Blockly.Variables.NAME_TYPE);

    var code = "for (var " + loopVar + " = 1 ; " + loopVar + " <= " + repeats + " ; " + loopVar + "++){\n";
    code += branch;
    code += "};\n";
    return code;
};

Blockly.JavaScript['controls_repeat'] =
    Blockly.JavaScript['controls_repeat_ext'];

Blockly.JavaScript['controls_whileUntil'] = function(block) {
    // Do while/until loop.
    var until = block.getFieldValue('MODE') == 'UNTIL';
    var argument0 = Blockly.JavaScript.valueToCode(block, 'BOOL',
        until ? Blockly.JavaScript.ORDER_LOGICAL_NOT : Blockly.JavaScript.ORDER_NONE);
    var branch = Blockly.JavaScript.statementToCode(block, 'DO');
    if ((branch === "") || (argument0 === "")) return "";
    branch = Blockly.JavaScript.addLoopTrap(branch, block.id);
    if (until) {
        argument0 = '!' + argument0;
    }
    return 'while (' + argument0 + ') {\n' + branch + '}\n';
};


Blockly.JavaScript['controls_repeatuntil'] = function(block) {
    var until = block.getFieldValue('MODE') == 'until';
    var argument0 = Blockly.JavaScript.valueToCode(block, 'BOOL',
        until ? Blockly.JavaScript.ORDER_LOGICAL_NOT : Blockly.JavaScript.ORDER_NONE);
    var branch = Blockly.JavaScript.statementToCode(block, 'DO');
    if ((branch === "") || (argument0 === "")) return "";
    if (until) {
        argument0 = '!' + argument0;
    }
    return 'do {\n' + branch + '} while (' + argument0 + ')\n';
};


Blockly.JavaScript['math_arithmetic'] = function(block) {
    // Basic arithmetic operators, and power.
    var OPERATORS = {
        'ADD': ['Math.plus', Blockly.JavaScript.ORDER_ADDITION],
        'MINUS': ['Math.minus', Blockly.JavaScript.ORDER_SUBTRACTION],
        'MULTIPLY': ['Math.times', Blockly.JavaScript.ORDER_MULTIPLICATION],
        'DIVIDE': ['Math.quotient', Blockly.JavaScript.ORDER_DIVISION],
        'POWER': ['Math.power', Blockly.JavaScript.ORDER_COMMA] // Handle power separately.
    };
    var tuple = OPERATORS[block.getFieldValue('OP')];
    var operator = tuple[0];
    var order = tuple[1];
    var argument0 = Blockly.JavaScript.valueToCode(block, 'A', order) || '0';
    var argument1 = Blockly.JavaScript.valueToCode(block, 'B', order) || '0';
    var code = operator + "(" + argument0 + "," + argument1 + ")";
    return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.JavaScript['math_random_int'] = function(block) {
    // Random integer between [X] and [Y].
    var a0 = Blockly.JavaScript.valueToCode(block, 'FROM',
        Blockly.JavaScript.ORDER_COMMA) || '0';
    var b0 = Blockly.JavaScript.valueToCode(block, 'TO',
        Blockly.JavaScript.ORDER_COMMA) || '0';
    var code = 'Math.floor(Math.random()*(Math.abs(' + a0 + '-' + b0 + ')+1)+(' + a0 + '+' + b0 + '-Math.abs(' + a0 + '-' + b0 + '))/2)';
    // var functionName = Blockly.JavaScript.provideFunction_(
    //     'math_random_int',
    //     [ 'function ' + Blockly.JavaScript.FUNCTION_NAME_PLACEHOLDER_ +
    //         '(a, b) {',
    //       '  if (a > b) {',
    //       '    // Swap a and b to ensure a is smaller.',
    //       '    var c = a;',
    //       '    a = b;',
    //       '    b = c;',
    //       '  }',
    //       '  return Math.floor(Math.random() * (b - a + 1) + a);',
    //       '}']);
    // var code = functionName + '(' + argument0 + ', ' + argument1 + ')';
    return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};


Blockly.JavaScript['variables_get'] = function(block) {
    // Variable getter.
    var code = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('VAR'),
        Blockly.Variables.NAME_TYPE);
    code = "blockly_var_" + code;
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};


Blockly.JavaScript['variables_set'] = function(block) {
    // Variable setter.
    var argument0 = Blockly.JavaScript.valueToCode(block, 'VALUE',
        Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';
    var varName = Blockly.JavaScript.variableDB_.getName(
        block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
    // console.log('blockly_var_' + varName + ' = ' + argument0 + ';\n');
    return 'blockly_var_' + varName + ' = ' + argument0 + ';\n';
    // return varName + ' = ' + argument0 + ';\n';
};


// Incrémentation :
Blockly.JavaScript['math_change'] = function(block) {
    // Add to a variable in place.
    var argument0 = Blockly.JavaScript.valueToCode(block, 'DELTA',
        Blockly.JavaScript.ORDER_ADDITION) || '0';
    var varName = Blockly.JavaScript.variableDB_.getName(
        block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
    return 'blockly_var_' + varName + ' = ' + 'blockly_var_' + varName + ' + ' + argument0 + ';\n';
};





Blockly.JavaScript['math_constant'] = function(block) {
    // Constants: PI, E, the Golden Ratio, sqrt(2), 1/sqrt(2), INFINITY.
    var CONSTANTS = {
        'PI': ['Math.PI', Blockly.JavaScript.ORDER_MEMBER],
        'E': ['Math.E', Blockly.JavaScript.ORDER_MEMBER],
        'CPLX': ['[0,1]', Blockly.JavaScript.ORDER_MEMBER],
        'GOLDEN_RATIO': ['(1 + Math.sqrt(5)) / 2', Blockly.JavaScript.ORDER_DIVISION],
        'SQRT2': ['Math.SQRT2', Blockly.JavaScript.ORDER_MEMBER],
        'SQRT1_2': ['Math.SQRT1_2', Blockly.JavaScript.ORDER_MEMBER],
        'INFINITY': ['Infinity', Blockly.JavaScript.ORDER_ATOMIC]
    };
    return CONSTANTS[block.getFieldValue('CONSTANT')];
};

Blockly.JavaScript['math_single'] = function(block) {
    // Math operators with single operand.
    var operator = block.getFieldValue('OP');
    var code;
    var arg;
    if (operator == 'NEG') {
        // Negation is a special case given its different operator precedence.
        arg = Blockly.JavaScript.valueToCode(block, 'NUM',
            Blockly.JavaScript.ORDER_UNARY_NEGATION) || '0';
        if (arg[0] == '-') {
            // --3 is not legal in JS.
            arg = ' ' + arg;
        }
        code = '-' + arg;
        return [code, Blockly.JavaScript.ORDER_UNARY_NEGATION];
    }
    if (operator == 'SIN' || operator == 'COS' || operator == 'TAN') {
        arg = Blockly.JavaScript.valueToCode(block, 'NUM',
            Blockly.JavaScript.ORDER_DIVISION) || '0';
    } else {
        arg = Blockly.JavaScript.valueToCode(block, 'NUM',
            Blockly.JavaScript.ORDER_NONE) || '0';
    }
    // First, handle cases which generate values that don't need parentheses
    // wrapping the code.
    switch (operator) {
        case 'ABS':
            code = 'Math.abs(' + arg + ')';
            break;
        case 'ROOT':
            code = 'Math.sqrt(' + arg + ')';
            break;
        case 'LN':
            code = 'Math.log(' + arg + ')';
            break;
        case 'EXP':
            code = 'Math.exp(' + arg + ')';
            break;
        case 'POW10':
            code = 'Math.pow(10,' + arg + ')';
            break;
        case 'ROUND':
            code = 'Math.round(' + arg + ')';
            break;
        case 'ROUNDUP':
            code = 'Math.ceil(' + arg + ')';
            break;
        case 'ROUNDDOWN':
            code = 'Math.floor(' + arg + ')';
            break;
        case 'SIN':
            code = 'Math.sin(' + arg + ')';
            break;
        case 'COS':
            code = 'Math.cos(' + arg + ')';
            break;
        case 'TAN':
            code = 'Math.tan(' + arg + ')';
            break;
    }
    if (code) {
        return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
    }
    // Second, handle cases which generate values that may need parentheses
    // wrapping the code.
    switch (operator) {
        case 'LOG10':
            code = 'Math.log(' + arg + ') / Math.log(10)';
            break;
        case 'ASIN':
            code = 'Math.asin(' + arg + ')';
            break;
        case 'ACOS':
            code = 'Math.acos(' + arg + ')';
            break;
        case 'ATAN':
            code = 'Math.atan(' + arg + ')';
            break;
        default:
            throw 'Unknown math operator: ' + operator;
    }
    return [code, Blockly.JavaScript.ORDER_DIVISION];
};

// Rounding functions have a single operand.
Blockly.JavaScript['math_round'] = Blockly.JavaScript['math_single'];
// Trigonometry functions have a single operand.
Blockly.JavaScript['math_trig'] = Blockly.JavaScript['math_single'];

Blockly.JavaScript['procedures_defreturn'] = function(block) {
    // Define a procedure with a return value.
    var funcName = Blockly.JavaScript.variableDB_.getName(
        block.getFieldValue('NAME'), Blockly.Procedures.NAME_TYPE);
    var branch = Blockly.JavaScript.statementToCode(block, 'STACK');
    if (Blockly.JavaScript.STATEMENT_PREFIX) {
        branch = Blockly.JavaScript.prefixLines(
            Blockly.JavaScript.STATEMENT_PREFIX.replace(/%1/g,
                '\'' + block.id + '\''), Blockly.JavaScript.INDENT) + branch;
    }
    if (Blockly.JavaScript.INFINITE_LOOP_TRAP) {
        branch = Blockly.JavaScript.INFINITE_LOOP_TRAP.replace(/%1/g,
            '\'' + block.id + '\'') + branch;
    }
    var returnValue = Blockly.JavaScript.valueToCode(block, 'RETURN',
        Blockly.JavaScript.ORDER_NONE) || '';
    if (returnValue) {
        returnValue = '  return ' + returnValue + ';\n';
    }
    var args = [];
    console.log
    for (var x = 0; x < block.arguments_.length; x++) {
        args.push(Blockly.JavaScript.variableDB_.getName(block.arguments_[x],
            Blockly.Variables.NAME_TYPE));
        var re = new RegExp("blockly_var_" + args[x] + "([^\\w]+)", "g");
        branch = branch.replace(re, "blockly_local_" + args[x] + "$1");
        if (returnValue) returnValue = returnValue.replace(re, "blockly_local_" + args[x] + "$1");
        args[x] = "blockly_local_" + args[x];
    }

    // Recherche dans le corps de la fonction de toutes les variables
    // susceptibles d'être locale. Une première affectation "myvar = 2"
    // sera ainsi remplacée par "var myvar = 2" :
    var rg = new RegExp("(^\\s*)(blockly_var_\\w+)(\\s*=\\s*)", "gm");
    var m;
    var myvars = [];
    while ((m = rg.exec(branch)) !== null) {
        if ((re) && (m.index === re.lastIndex)) {
            re.lastIndex++;
        }
        if (myvars.indexOf(m[2]) === -1) {
            myvars.push(m[2]);
        }
    }
    for (var i = 0; i < myvars.length; i++) {
        var reg = new RegExp("(^\\s*)(" + myvars[i] + ")(\\s*=\\s*)", "m");
        branch = branch.replace(reg, "$1 var $2$3");
    }


    var code = 'function ' + funcName + '(' + args.join(',') + ') {\n' + branch + returnValue + '}';
    code = Blockly.JavaScript.scrub_(block, code);
    Blockly.JavaScript.definitions_[funcName] = code;
    return null;
};

// Defining a procedure without a return value uses the same generator as
// a procedure with a return value.
Blockly.JavaScript['procedures_defnoreturn'] =
    Blockly.JavaScript['procedures_defreturn'];
