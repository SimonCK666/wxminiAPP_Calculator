// pages/calculate/calculate.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id1: "clear",
    id2: "negative",
    id3: "percentage",
    id4: "/",
    id5: "7",
    id6: "8",
    id7: "9",
    id8: "x",
    id9: "4",
    id10: "5",
    id11: "6",
    id12: "-",
    id13: "1",
    id14: "2",
    id15: "3",
    id16: "+",
    id17: "0",
    id18: ".",
    id19: "=",
    screenOutput: "0",
    // 判断最后输入是否为操作符
    lastIsOperator: false,
    // 全局数组
    arr: []
  },


  clickButton(e) {
    console.log(e.target.id);
    var initData =        this.data.screenOutput;
    // 拿到 id
    var id = e.target.id;
    var data;

    /* 每个 button 的功能 */
    if (id == this.data.id1) {
        /* AC 清屏 */
        this.setData({
            screenOutput: "0"
        });
        // 数组长度为0
        this.data.arr.length = 0;
    } else if (id == this.data.id2) {
        var data = this.data.screenOutput;
        if (data == 0) {
            return;
        }

        // 从头遍历 id2 including '+' and '-'
        var firstWord = data.substring(0,1);
        if (firstWord != '-') {
            data = '-' + data;
            // 在第一个元素 增加 "-"
            this.data.arr.unshift("-");
        } else {
            data = data.substring(1);
            // UnClear
            this.data.arr.shift();
        }
        this.setData({
            screenOutput: data
        });
    } else if (id == this.data.id19) {
        // 当 id 至等号时
        var data = this.data.screenOutput;
        if (data == 0) {
          return;
        }
        // 判断最后一个字符不能为 operator
        var lastWord = data.substring(data.length - 1, data.length);
        if (isNaN(lastWord)) {
          return;
        }

        // 存储数字
        var num = "";

        var lastOperator;
        // 全局数组中的项
        var arr = this.data.arr;
        var optorarr = [];
        // 遍历数组
        for (var i in arr) {
          // 如果最后一个输入 operator --> 将之前的数 拼接成一个数
          if (isNaN(arr[i]) == false || arr[i] == this.data.id18 || arr[i] == this.data.id2) {
            num += arr[i];
          } else {
            // 将符号放入 optorarr
            lastOperator = arr[i];
            optorarr.push(num);
            optorarr.push(arr[i]);
            num = "";
          }
        }
        // 将 operator 之前的数 放入 optorarr
        optorarr.push(Number(num));
        // 将 number 变为小数
        var result = Number(optorarr[0]) * 1.0;

        for (var i = 1; i < optorarr.length; i++) {
          if (isNaN(optorarr[i])) {

            /* + - * / */

            if (optorarr[1] == this.data.id4) {
              result /= Number(optorarr[i+1]);
            } else if (optorarr[1] == this.data.id8) {
              result *= Number(optorarr[i+1]);
            } else if (optorarr[1] == this.data.id12) {
              result -= Number(optorarr[i+1]);
            } else if (optorarr[1] == this.data.id16) {
              result += Number(optorarr[i+1]);
            }
          }
        }
        // 将数组清空
        this.data.arr.length = 0;
        // 将 result 放入
        this.data.arr.push(result);
        this.setData({
          screenOutput: result + ""
        });

      }
      
      else {

          if (id == this.data.id4 || id == this.data.id8 || id == this.data.id12 || id == this.data.id16) {
            if (this.data.lastIsOperator == true || this.data.screenOutput == 0) {
              // 不能第一个输入为操作符
              return;
            }
          }

          if (initData == 0) {
            data = id;
          } else {
            // 将输入的字符串进行拼接
            data = initData + id;
          }

          //   在 Screen 输出 data
          this.setData({
            screenOutput: data
          });

          // 每次点击 放入 id
          this.data.arr.push(id);

          // 操作符不能连续输入
          if (id == this.data.id4 || id == this.data.id8 || id == this.data.id12 || id == this.data.id16) {
            this.setData({
                lastIsOperator:true
            });
          } else {
            this.setData({
                lastIsOperator:false
            });
          }
      }
  },

    

      


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})