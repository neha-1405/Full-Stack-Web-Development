import React, { useState } from &quot;react&quot;;
import { v4 as uuidv4 } from &quot;uuid&quot;;

const ExpenseForm = ({ dispatch }) =&gt; {
    const [name, setName] = useState(&quot;&quot;);
const [amount, setAmount] = useState(&quot;&quot;);

    const handleSubmit = (e) =&gt; {
        e.preventDefault();
        if (!name || !amount) return;
        dispatch({ type: &quot;ADD_EXPENSE&quot;, id: uuidv4(), name, amount });
        setName(&quot;&quot;);
        setAmount(&quot;&quot;);
};

    return (
        &lt;form onSubmit={handleSubmit}&gt;
            &lt;input type=&quot;text&quot; placeholder=&quot;Expense Name&quot; value={name} onChange={(e) =&gt;
setName(e.target.value)} /&gt;
            &lt;input type=&quot;number&quot; placeholder=&quot;Amount&quot; value={amount} onChange={(e) =&gt;
setAmount(e.target.value)} /&gt;
            &lt;button type=&quot;submit&quot;&gt;Add Expense&lt;/button&gt;
        &lt;/form&gt;

    );
};

export default ExpenseForm;

export const expenseReducer = (state, action) =&gt; {
    switch (action.type) {
        case &quot;ADD_EXPENSE&quot;:
            return [...state, { id: action.id, name: action.name, amount: action.amount }];
        case &quot;REMOVE_EXPENSE&quot;:
            return state.filter(expense =&gt; expense.id !== action.id);
        default:
            return state;
    }
};
import React, { useReducer } from &quot;react&quot;;
import { expenseReducer } from &quot;./ExpenseReducer&quot;;
import ExpenseForm from &quot;./ExpenseForm&quot;;
import ExpenseList from &quot;./ExpenseList&quot;;
import &quot;./App.css&quot;;

const ExpenseTracker = () =&gt; {
const [expenses, dispatch] = useReducer(expenseReducer, []);

    return (
        &lt;div className=&quot;tracker&quot;&gt;
            &lt;h2&gt;Expense Tracker&lt;/h2&gt;
            &lt;ExpenseForm dispatch={dispatch} /&gt;
            &lt;ExpenseList expenses={expenses} dispatch={dispatch} /&gt;

            &lt;h3&gt;Total Expenses: ${expenses.reduce((acc, expense) =&gt; acc + parseFloat(expense.amount),
0)}&lt;/h3&gt;
        &lt;/div&gt;
    );
};

export default ExpenseTracker;
