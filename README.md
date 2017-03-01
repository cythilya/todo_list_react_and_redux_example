# Todo List: React and Redux Example
使用React與Redux實作Todo List。

## 功能介紹 / Demo
![Todo List -  React and Redux Example](demo.gif)

功能有：

- 新增一個todo
- 刪除一個todo
- [待完成] 編輯一個todo的名稱
- 更改todo狀態：完成/未完成
- 切換filter，列出全部或已完成的todo

## 說明
程式碼說明如下。

### Constants
定義Action Type和Model。

#### Action Type
將動作定義成常數，例如：建立一個todo(CREATE_TODO)、刪除一個todo(DELETE_TODO)。對規模小的應用程式來說，這看起來很多餘

#### Model
Model的功能是

- 定義資料結構
- 設定初始值

這裡會使用`Immutable.fromJS()`將 TodoState 這個 JavaScript Object 轉換成 ImmutableJS 可用的 Map 結構，之後的操作都會使用 ImmutableJS 的 API，而非一般 JavaScript Object 操作的 API，注意別混淆了。

### Actions
使用`createAction`來包裝action creator，使其回傳值是 flux 的標準的 payload 格式。

### Reducers
更新state。

這裡說明一下Immutable.js存取物件或陣列的方法，使用`set()`和`get()`；而當list或map內部有包list或map時，則需要使用`setIn()`和`getIn()`。如果list或map內部有包list或map時，指定索引的方式為放到陣列裡面，例如：

    var list_1 = Immutable.fromJS(['a', ['b', 'c', 'd'], 'e']);
    var list_2 = list1.set([1, 2], 'new'); //list_2 為 ['a', ['b', 'c', new'], 'e']

所以，當想要設定TodoState的todos中某個item的completed的值為true時，就要找到TodoState的todos，再使用回傳的index找todos裡面指定的索引的元素，再再找這個item裡面的completed，然後設定completed為true。

    state.setIn(['todos', payload.index, 'completed'], true);

### Store
儲存state的地方。

### Components
純View的展示，這裡切分Components為

- Layout：最外層的框框，用來包裝TodoHeader、TodoList和Filter
- TodoHeader：含有新增task功能
- TodoList：顯示task列表
- Filter：顯示全部或已完成的tasks

### Container
使用Container和Store溝通，對於這樣的拆分方式可參考[這篇](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0#.nr2ds9lyk)，所以，若Component要跟Store溝通，就會有對應的Container。

## 參考資料
- [Redux 實戰入門](https://github.com/kdchang/reactjs101/blob/master/Ch07/react-redux-real-world-example.md)
- [Immutable.js 簡介](https://rhadow.github.io/2015/05/10/flux-immutable)
- [Presentational and Container Components](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0#.nr2ds9lyk)
