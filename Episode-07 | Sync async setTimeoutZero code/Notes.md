Here are the **interview questions** based on the Namaste Node.js episode **"Sync, Async & `setTimeout(0)`"**, along with **detailed answers**:

---

## ✅ JavaScript Interview Question: Event Loop, `setTimeout(0)`, Microtasks vs Macrotasks

### **Code Snippet:**

```js
console.log('Start');

setTimeout(() => {
  console.log('Timeout 0');
}, 0);

Promise.resolve().then(() => {
  console.log('Promise');
});

console.log('End');
```

---

### **Question 1:**

❓ What will be the exact output of this code?

### ✅ **Answer 1:**

```
Start
End
Promise
Timeout 0
```

---

### **Question 2:**

❓ Why does `setTimeout(..., 0)` run after the Promise callback even though the timeout is zero?

### ✅ **Answer 2:**

JavaScript uses an **event loop** that manages task queues:

* `setTimeout(fn, 0)` puts the callback into the **macrotask queue** (aka **task queue**).
* `Promise.then()` puts the callback into the **microtask queue**.

The **event loop always prioritizes microtasks** over macrotasks. After the synchronous code finishes running:

1. All microtasks (like `Promise.then()`) are executed.
2. Then the event loop picks the next macrotask (like `setTimeout`), even if its delay is `0`.

---

### **Question 3:**

❓ What is the difference between **microtasks** and **macrotasks**?

### ✅ **Answer 3:**

| Feature       | Microtasks                             | Macrotasks                           |
| ------------- | -------------------------------------- | ------------------------------------ |
| Examples      | `Promise.then`, `queueMicrotask`       | `setTimeout`, `setInterval`, I/O     |
| Priority      | Higher – run **before** any macrotasks | Lower – run **after** all microtasks |
| When executed | After each synchronous block           | In the next tick of event loop       |

**Microtasks run immediately after the current JS stack is empty**, while **macrotasks wait for the next cycle.**

---

### **Question 4:**

❓ Will this behavior be different in Node.js compared to the browser?

### ✅ **Answer 4:**

Slightly. In **Node.js**, there are more types of queues:

* `process.nextTick()` has higher priority than microtasks (`Promise.then()`).
* There’s also the **"check" phase** where `setTimeout` and `setImmediate` behave differently.

**In this specific code (`setTimeout` and `Promise`)**, the behavior is **the same in both environments** — **microtasks (`Promise`) still run before macrotasks (`setTimeout`)**.

---

### **Question 5 (Bonus):**

❓ Can you change the code so `"Timeout 0"` runs before `"Promise"` without using `async/await`?

### ✅ **Answer 5:**

Yes. Move the `Promise` into the `setTimeout`:

```js
console.log('Start');

setTimeout(() => {
  console.log('Timeout 0');
  Promise.resolve().then(() => {
    console.log('Promise');
  });
}, 0);

console.log('End');
```

### Output:

```
Start
End
Timeout 0
Promise
```

Now `"Promise"` runs **after** `"Timeout 0"` because it becomes a **microtask inside the macrotask**.

---

Let me know if you want a visual diagram of the event loop or variations using `setImmediate`, `process.nextTick()`, etc.



बिलकुल! नीचे वही इंटरव्यू प्रश्न और उत्तर दिए गए हैं — **सरल हिंदी भाषा** में — ताकि आपको concept अच्छी तरह समझ आ जाए:

---

## ✅ इंटरव्यू प्रश्न: Event Loop, `setTimeout(0)`, Microtask vs Macrotask

### **Code Snippet:**

```js
console.log('Start');

setTimeout(() => {
  console.log('Timeout 0');
}, 0);

Promise.resolve().then(() => {
  console.log('Promise');
});

console.log('End');
```

---

### ❓ **प्रश्न 1:**

इस कोड का आउटपुट क्या होगा?

### ✅ **उत्तर 1:**

```
Start  
End  
Promise  
Timeout 0
```

---

### ❓ **प्रश्न 2:**

`setTimeout(..., 0)` का delay "0" है, फिर भी यह `Promise.then()` के बाद क्यों चलता है?

### ✅ **उत्तर 2:**

JavaScript में एक **Event Loop** होता है जो दो queue को संभालता है:

1. **Microtask Queue** – जैसे `Promise.then()`, `queueMicrotask`
2. **Macrotask Queue** – जैसे `setTimeout`, `setInterval`

जब synchronous कोड (जैसे `console.log('Start')`) खत्म हो जाता है, तो:

* पहले **microtask queue** की सारी चीजें चलती हैं
* उसके बाद ही **macrotask queue** की बारी आती है

इसलिए `Promise` पहले execute होता है और `setTimeout` बाद में—even if उसका delay `0ms` है।

---

### ❓ **प्रश्न 3:**

**Microtask और Macrotask में क्या फर्क होता है?**

### ✅ **उत्तर 3:**

| फ़ीचर                 | Microtask                        | Macrotask                   |
| --------------------- | -------------------------------- | --------------------------- |
| उदाहरण                | `Promise.then`, `queueMicrotask` | `setTimeout`, `setInterval` |
| प्राथमिकता (Priority) | बहुत ज्यादा (पहले चलती हैं)      | कम (बाद में चलती हैं)       |
| कब चलती हैं           | JS का sync कोड खत्म होने के बाद  | अगली Event Loop cycle में   |

👉 **Microtask**, synchronous कोड के ठीक बाद ही चलती हैं
👉 **Macrotask**, थोड़ी देरी से अगले event loop टर्न में

---

### ❓ **प्रश्न 4:**

क्या Node.js और Browser में इसका behavior अलग होगा?

### ✅ **उत्तर 4:**

**थोड़ा बहुत फर्क हो सकता है**, क्योंकि Node.js में:

* `process.nextTick()` नाम की एक अलग internal queue होती है, जो even `Promise` से भी पहले चलती है।
* `setImmediate()` नाम का एक और macrotask भी होता है।

लेकिन इस केस में (`setTimeout` और `Promise`), **browser और Node.js दोनों में behavior एक जैसा ही होगा**:
➡️ `Promise` पहले चलेगा, फिर `setTimeout(0)`।

---

### ❓ **प्रश्न 5 (Bonus):**

क्या आप कोड को ऐसा बदल सकते हैं कि `"Timeout 0"` पहले चले और `"Promise"` बाद में?

### ✅ **उत्तर 5:**

हाँ, आप `Promise` को `setTimeout` के अंदर डाल दीजिए:

```js
console.log('Start');

setTimeout(() => {
  console.log('Timeout 0');
  Promise.resolve().then(() => {
    console.log('Promise');
  });
}, 0);

console.log('End');
```

### आउटपुट होगा:

```
Start  
End  
Timeout 0  
Promise
```

क्यों? क्योंकि `Promise` अब `setTimeout` के अंदर है और एक **microtask है उस macrotask के बाद**, इसलिए बाद में चलेगा।

---

अगर आप चाहें तो मैं इसका एक आसान **diagram या animation** भी समझा सकता हूँ जो browser vs Node.js का फर्क दिखाए। बताइए?

