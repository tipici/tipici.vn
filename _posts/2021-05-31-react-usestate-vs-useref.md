---
layout: post
title: Sơ lược về useState và useRef trong reactjs
categories: [Blog]
image: /images/blog/react-usestate-vs-useref/react-hooks-lifecycle-diagram.jpeg
thumb: /images/blog/react-usestate-vs-useref/react-hooks-lifecycle-diagram.jpeg
sku: Blog002
date: 31-05-2021
author: Jack
---

# ĐẶT VẤN ĐỀ
Khi làm việc với reactjs chúng ta thường hay gặp các hàm useState và useRef. Vậy chúng giống và khác nhau ở điểm nào?

# useState
```
const [state, setState] = useState(initialState);
```

useState trả về một giá trị state và một hàm để cập nhật nó. Giá trị khởi tạo là initialState.

Ví dụ

```
import React, { useState } from 'react';

function Example() {
  // Khai báo một biến gọi là "count"
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Bạn đã click {count} lần</p>
      <button onClick={() => setCount(count + 1)}>
        Click tôi
      </button>
    </div>
  );
}
```

Với ví dụ trên ta dễ dàng nhận thấy, useState trả về 1 mảng hai item
  - count: phần tư thứ nhất là giá trị state, phần tử này có thể là số, string, object
  - setCount: phần tử thứ hai là hàm số dùng để cập nhật giá trị cho biến số count chứ bản thân count không gán trực tiếp được.

Giá trị khởi tạo: là giá trị khởi tạo ban đầu cho state. Ở ví dụ trên giá trị khởi tạo là 0


# useRef
```
const refContainer = useRef(initialValue);
```

useRef trả về một đối tượng ref của DOM có thể thay đổi có thuộc tính .current được khởi tạo cho đối số được truyền vào (initialValue). Đối tượng được trả về sẽ tồn tại trong toàn bộ thời gian tồn tại của thành phần.

Dùng useRef khi bạn cần thao tác với các thành phần của DOM, ví dụ như input, div, span, p,...

useRef.current có thể gán trực tiếp được giá trị.


Ví dụ
```
function TextInputWithFocusButton() {
  const inputEl = useRef(null);
  const onButtonClick = () => {
    // `current` points to the mounted text input element
    inputEl.current.focus();
  };
  return (
    <>
      <input ref={inputEl} type="text" />
      <button onClick={onButtonClick}>Focus the input</button>
    </>
  );
}
```
Trong ví dụ này khi người dùng click chuột vào button thì inout có ref là inputEl sẽ nhận focus. Điều này useState không thể làm được.

## Tại sao không dùng let để khai báo biến thay thế cho useRef
Ví dụ khác
```
import { useEffect, useState } from "react";
import "./styles.css";
const AppDemo14 = () => {
  console.log("render");
  const [count, setCount] = useState(0);
  let prevCount;
  useEffect(() => {
    console.log("useEffect", prevCount);
    prevCount = count;
  }, [count]);
  return (
    <div className="App">
      <h1>
        Now: {count}, before: {prevCount}
      </h1>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
};
```
Ở đây, prevCount được gán bằng state count mỗi khi count thay đổi. Tuy nhiên, sau khi gán xong lifecycle lại bắt đầu một chu kỳ mới làm cho câu lệnh `let prevCount` thực thi dẫn đến kết quả ở `console.log("useEffect", prevCount);` là undefined chứ không phải count.

## TÓM LẠI
1. Cách sử dụng:
    - chỉ được dùng Hooks trong functional component hoặc trong Custom Hooks khác, không sử dụng được trong if, for, switch case,..
    - luôn sử dụng Hooks trong root level trong component của bạn

2. Cả hai đều bảo toàn dữ liệu của chúng trong lifecycle (chu kỳ hiển thị) và cập nhật giao diện người dùng, nhưng chỉ useState Hook tạo render ở ui người dùng

3. useRef.current có thể gán trực tiếp được giá trị, còn biến của useState không thể gán trực tiếp giá trị mà phải thông qua hàm (phần tử thứ 2)

4. Chỉ useRef mới có thể truy cập đến các phần tử của DOM còn useState thì không. Do vậy khi cần thao tác với DOM thì nhất thiết phải dùng useRef

-TiPiCi Jack-


### Tham khảo:

[1] [https://blog.logrocket.com/usestate-vs-useref/](https://blog.logrocket.com/usestate-vs-useref/)

[2] [https://reactjs.org/docs/hooks-reference.html](https://reactjs.org/docs/hooks-reference.html)