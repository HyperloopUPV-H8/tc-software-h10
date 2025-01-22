

const myButton = document.getElementById("myButton");


function calc(one, two, oper) {
        if (oper === '/' && two === 0) {
                document.getElementById('outputField').textContent = "Error: Division by zero";
                return;
        }
    
    
        switch (oper) {
            case '*': return one * two;
            case '/': return one / two;
            case '+': return one + two;
            case '-': return one - two;
            default: return 0;
        }
    }
    
function getOper(exp, i) {
        let op1 = "";
        let op2 = "";
        let start = i - 1;
        let end = i + 1;
    
        for (; start >= 0; start--) {
            if ("(+-*/".includes(exp[start])) {
                if (start === 0 && "+-".includes(exp[start])) op1 += exp[start];
                else if (start - 1 >= 0 && "(+-*/".includes(exp[start - 1])) op1 += exp[start];
                else break;
            } else op1 += exp[start];
        }
        
        op1 = [...op1].reverse().join("");
        const oper1 = parseFloat(op1);
    
        for (; end < exp.length; end++) {
            if (")+-*/".includes(exp[end]) && end !== i + 1) break;
            else op2 += exp[end];
        }
        const oper2 = parseFloat(op2);
    
        return { o1: oper1, o2: oper2, start, end };
    }
        
    function evaluateExp(e) {
        let brackets = false;
        const st = [];
        // console.log(e.exp);
        for (let i = 0; i < e.exp.length; i++) {
            if (e.exp[i] === '(') {
                st.push(i);
                brackets = true;
            } else if (e.exp[i] === ')') {
                brackets = false;
                const aux = st.pop();
                const auxx = evaluateExp({ exp: e.exp.substring(aux + 1, i), num: 0 });
                e.exp = e.exp.slice(0, aux) + auxx.exp + e.exp.slice(i + 1);
                e = evaluateExp(e);
            } else if ("*/".includes(e.exp[i]) && !brackets) {
                const { o1, o2, start, end } = getOper(e.exp, i);
                const res = calc(o1, o2, e.exp[i]);
                const resS = res.toString();
                e.exp = e.exp.slice(0, start + 1) + resS + e.exp.slice(end);
                e.num = res;
                e = evaluateExp(e);
            } else if ("+-".includes(e.exp[i]) && !e.exp.includes("*") && !e.exp.includes("/") && i !== 0) {
                const { o1, o2, start, end } = getOper(e.exp, i);
                const res = calc(o1, o2, e.exp[i]);
                const resS = res.toString();
                e.exp = e.exp.slice(0, start + 1) + resS + e.exp.slice(end);
                e.num = res;
                e = evaluateExp(e);
            }
        }
        return e;
    }

myButton.addEventListener("click", function () {
        const inputElement = document.getElementById('inputField');
        const exp = inputElement.value;
        console.log(exp);
        const result = evaluateExp({ exp, num: 0 });
        let text = "Result: " + result.num;
        document.getElementById('outputField').textContent = text;
});
