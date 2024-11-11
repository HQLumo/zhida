if (typeof Promise !== "undefined" && !Promise.prototype.finally) {
  Promise.prototype.finally = function(callback) {
    const promise = this.constructor;
    return this.then(
      (value) => promise.resolve(callback()).then(() => value),
      (reason) => promise.resolve(callback()).then(() => {
        throw reason;
      })
    );
  };
}
;
if (typeof uni !== "undefined" && uni && uni.requireGlobal) {
  const global = uni.requireGlobal();
  ArrayBuffer = global.ArrayBuffer;
  Int8Array = global.Int8Array;
  Uint8Array = global.Uint8Array;
  Uint8ClampedArray = global.Uint8ClampedArray;
  Int16Array = global.Int16Array;
  Uint16Array = global.Uint16Array;
  Int32Array = global.Int32Array;
  Uint32Array = global.Uint32Array;
  Float32Array = global.Float32Array;
  Float64Array = global.Float64Array;
  BigInt64Array = global.BigInt64Array;
  BigUint64Array = global.BigUint64Array;
}
;
if (uni.restoreGlobal) {
  uni.restoreGlobal(Vue, weex, plus, setTimeout, clearTimeout, setInterval, clearInterval);
}
(function(vue) {
  "use strict";
  function formatAppLog(type, filename, ...args) {
    if (uni.__log__) {
      uni.__log__(type, filename, ...args);
    } else {
      console[type].apply(console, [...args, filename]);
    }
  }
  const _imports_0$7 = "/static/logo.png";
  const _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };
  const _sfc_main$s = {
    data() {
      return {
        username: "",
        pwd: ""
      };
    },
    methods: {
      login() {
        uni.request({
          url: this.$url + "/user/passwordLogin",
          method: "POST",
          data: {
            username: this.username,
            password: this.pwd
          },
          success: (res) => {
            if (res.data.code == 500) {
              uni.showToast({
                title: "账号不存在或密码输入错误",
                icon: "none"
              });
            } else {
              uni.setStorageSync("username", this.username);
              uni.setStorageSync("pwd", this.pwd);
              uni.setStorageSync("token", res.data.data.token);
              uni.connectSocket({
                url: "ws://47.97.7.86:8887/ws/connect?token=" + uni.getStorageSync("token")
              });
              uni.onSocketOpen((res2) => {
                formatAppLog("log", "at pages/account/login.vue:71", "websocket open");
              });
              uni.onSocketClose((res2) => {
                formatAppLog("log", "at pages/account/login.vue:74", "websocket close" + res2);
              });
              uni.onSocketError((res2) => {
                formatAppLog("error", "at pages/account/login.vue:77", "websocket error");
              });
              uni.navigateTo({
                url: "/pages/main/main"
              });
            }
          }
        });
      },
      toSignup() {
        uni.navigateTo({
          url: "/pages/account/signup"
        });
      },
      toForgetpwd() {
        uni.navigateTo({
          url: "/pages/account/forgetpwd"
        });
      }
    },
    mounted() {
      const username = uni.getStorageSync("username");
      const pwd = uni.getStorageSync("pwd");
      if (username && pwd) {
        this.username = username;
        this.pwd = pwd;
      }
    }
  };
  function _sfc_render$r(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      vue.Fragment,
      null,
      [
        vue.createElementVNode("view", { class: "img-box" }, [
          vue.createElementVNode("image", { src: _imports_0$7 })
        ]),
        vue.createElementVNode("view", { class: "login-box" }, [
          vue.createElementVNode("view", { class: "title" }, " 手机号 "),
          vue.createElementVNode("view", { class: "box-1" }, [
            vue.withDirectives(vue.createElementVNode(
              "input",
              {
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.username = $event),
                type: "text",
                style: { "width": "100%" }
              },
              null,
              512
              /* NEED_PATCH */
            ), [
              [vue.vModelText, $data.username]
            ])
          ]),
          vue.createElementVNode("view", { class: "title" }, " 密码 "),
          vue.createElementVNode("view", { class: "box-1" }, [
            vue.withDirectives(vue.createElementVNode(
              "input",
              {
                "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $data.pwd = $event),
                password: "true",
                style: { "width": "100%" }
              },
              null,
              512
              /* NEED_PATCH */
            ), [
              [vue.vModelText, $data.pwd]
            ])
          ]),
          vue.createElementVNode("view", {
            class: "forgetpwd",
            onClick: _cache[2] || (_cache[2] = ($event) => $options.toForgetpwd())
          }, " 忘记密码 "),
          vue.createElementVNode("view", { class: "login-btn-box" }, [
            vue.createElementVNode("view", {
              class: "login-btn",
              onClick: _cache[3] || (_cache[3] = ($event) => $options.login())
            }, [
              vue.createElementVNode("text", { class: "login-txt" }, "登录")
            ])
          ])
        ]),
        vue.createElementVNode("view", { class: "signup-box" }, [
          vue.createElementVNode("view", { class: "txt" }, " 没有注册账号？ "),
          vue.createElementVNode("view", {
            class: "tosignup",
            onClick: _cache[4] || (_cache[4] = ($event) => $options.toSignup())
          }, " 点击注册 ")
        ])
      ],
      64
      /* STABLE_FRAGMENT */
    );
  }
  const PagesAccountLogin = /* @__PURE__ */ _export_sfc(_sfc_main$s, [["render", _sfc_render$r], ["__file", "E:/HBuilderX/Projects/职达/pages/account/login.vue"]]);
  const _imports_1$5 = "/static/back.svg";
  const _imports_1$4 = "/static/list.svg";
  const _sfc_main$r = {
    name: "top-nav-bar",
    props: {
      title: {
        type: String,
        default: "标题"
      },
      showBackBtn: {
        type: Boolean,
        default: false
      },
      showListBtn: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {};
    },
    methods: {
      back() {
        uni.navigateBack();
      },
      openList() {
        uni.navigateTo({
          url: "/pages/chat/chat"
        });
      },
      onClickPopMenu() {
      }
    }
  };
  function _sfc_render$q(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      vue.Fragment,
      null,
      [
        vue.createElementVNode("view", { class: "top-nav-bar-box" }, [
          vue.createElementVNode("view", { class: "content" }, [
            vue.createElementVNode("view", { class: "back-btn" }, [
              $props.showBackBtn ? (vue.openBlock(), vue.createElementBlock("image", {
                key: 0,
                src: _imports_1$5,
                mode: "scaleToFill",
                onClick: _cache[0] || (_cache[0] = ($event) => $options.back())
              })) : vue.createCommentVNode("v-if", true)
            ]),
            vue.createElementVNode("view", { class: "title-txt" }, [
              vue.createElementVNode(
                "text",
                null,
                vue.toDisplayString($props.title),
                1
                /* TEXT */
              )
            ]),
            vue.createElementVNode("view", { class: "list-btn" }, [
              $props.showListBtn ? (vue.openBlock(), vue.createElementBlock("image", {
                key: 0,
                src: _imports_1$4,
                mode: "scaleToFill",
                onClick: _cache[1] || (_cache[1] = ($event) => $options.openList())
              })) : vue.createCommentVNode("v-if", true)
            ])
          ])
        ]),
        vue.createElementVNode("view", { class: "space-box" })
      ],
      64
      /* STABLE_FRAGMENT */
    );
  }
  const TopNavBar = /* @__PURE__ */ _export_sfc(_sfc_main$r, [["render", _sfc_render$q], ["__scopeId", "data-v-ef27e09d"], ["__file", "E:/HBuilderX/Projects/职达/components/top-nav-bar/top-nav-bar.vue"]]);
  const _imports_0$6 = "/static/search.svg";
  const _sfc_main$q = {
    name: "searchbar",
    data() {
      return {};
    },
    methods: {
      onSearch() {
      }
    }
  };
  function _sfc_render$p(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "search-box" }, [
      vue.createElementVNode("view", { class: "search-bar-box" }, [
        vue.createElementVNode("view", { class: "search-bar" }, [
          vue.createElementVNode("view", { class: "search-input" }, [
            vue.createElementVNode("input", {
              id: "search-txt",
              type: "text",
              name: "",
              placeholder: "搜索"
            })
          ]),
          vue.createElementVNode("view", {
            id: "search-btn",
            onClick: _cache[0] || (_cache[0] = ($event) => $options.onSearch())
          }, [
            vue.createElementVNode("image", {
              src: _imports_0$6,
              mode: "scaleToFill",
              style: { "width": "15px", "height": "15px" }
            })
          ])
        ])
      ])
    ]);
  }
  const SearchBar = /* @__PURE__ */ _export_sfc(_sfc_main$q, [["render", _sfc_render$p], ["__scopeId", "data-v-ea82f5cf"], ["__file", "E:/HBuilderX/Projects/职达/components/searchbar/searchbar.vue"]]);
  const _sfc_main$p = {
    name: "attribute-box",
    props: {
      img_url: {
        type: String,
        default: "/static/send.svg"
      },
      num: {
        type: Int16Array,
        default: 0
      },
      color: {
        type: String,
        default: "#eee"
      },
      showNum: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {};
    }
  };
  function _sfc_render$o(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: "attribute-box",
        style: vue.normalizeStyle({ background: $props.color })
      },
      [
        vue.createElementVNode("image", {
          src: $props.img_url,
          mode: "aspectFill"
        }, null, 8, ["src"]),
        $props.showNum ? (vue.openBlock(), vue.createElementBlock(
          "text",
          { key: 0 },
          vue.toDisplayString($props.num),
          1
          /* TEXT */
        )) : vue.createCommentVNode("v-if", true)
      ],
      4
      /* STYLE */
    );
  }
  const AttributeBox = /* @__PURE__ */ _export_sfc(_sfc_main$p, [["render", _sfc_render$o], ["__scopeId", "data-v-a1ec1afa"], ["__file", "E:/HBuilderX/Projects/职达/components/attribute-box/attribute-box.vue"]]);
  const _sfc_main$o = {
    components: {
      TopNavBar,
      SearchBar,
      AttributeBox
    },
    data() {
      return {
        topBanner: [
          {
            img_url: "/static/testAvatar.jpg"
          },
          {
            img_url: "/static/testAvatar.jpg"
          }
        ],
        activityPage: 0,
        activityData: []
      };
    },
    methods: {
      loadMoreActivityData() {
        uni.request({
          url: this.$url + "/activity/getActivities/" + this.activityPage + "/5",
          method: "GET",
          success: (res) => {
            res.data.data.records.forEach((item, index) => {
              this.activityData.push(item);
            });
            this.activityPage += 1;
          }
        });
      }
    },
    mounted() {
      var that = this;
      uni.$on("reloadData", function() {
        that.activityPage = 0;
        that.activityData = [];
        that.loadMoreActivityData();
      });
    },
    beforeDestroy() {
      uni.$off("reloadData");
    }
  };
  function _sfc_render$n(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_TopNavBar = vue.resolveComponent("TopNavBar");
    const _component_SearchBar = vue.resolveComponent("SearchBar");
    const _component_AttributeBox = vue.resolveComponent("AttributeBox");
    return vue.openBlock(), vue.createElementBlock("view", null, [
      vue.createVNode(_component_TopNavBar, { title: "首页" }),
      vue.createVNode(_component_SearchBar),
      vue.createElementVNode("view", { class: "banner-box" }, [
        vue.createElementVNode("view", { class: "box-1" }, [
          vue.createElementVNode("swiper", {
            class: "swiper",
            "indicator-dots": false,
            autoplay: true,
            interval: 3e3,
            duration: 1500
          }, [
            (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList($data.topBanner, (item, index) => {
                return vue.openBlock(), vue.createElementBlock("swiper-item", {
                  class: "banner",
                  key: index
                }, [
                  vue.createElementVNode("image", {
                    src: item.img_url,
                    mode: "aspectFill"
                  }, null, 8, ["src"])
                ]);
              }),
              128
              /* KEYED_FRAGMENT */
            ))
          ])
        ])
      ]),
      vue.createElementVNode("view", { class: "activity-box" }, [
        vue.createElementVNode("view", { class: "box-1" }, [
          vue.createElementVNode("view", { class: "title" }, "活动")
        ]),
        vue.createElementVNode("view", { class: "box-2" }, [
          (vue.openBlock(true), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList($data.activityData, (item, index) => {
              return vue.openBlock(), vue.createElementBlock("view", {
                class: "activity-item",
                key: index
              }, [
                vue.createElementVNode("image", {
                  class: "img",
                  src: this.$url + "/file/getImage/" + item.activityCover,
                  mode: "aspectFill"
                }, null, 8, ["src"]),
                vue.createElementVNode("view", { class: "column-box" }, [
                  vue.createElementVNode(
                    "view",
                    { class: "name" },
                    vue.toDisplayString(item.activityTitle),
                    1
                    /* TEXT */
                  ),
                  vue.createElementVNode(
                    "view",
                    { class: "startTime" },
                    " 活动时间：" + vue.toDisplayString(item.beginTime.replace("T", " ")),
                    1
                    /* TEXT */
                  ),
                  vue.createElementVNode(
                    "view",
                    { class: "address" },
                    " 活动地点：" + vue.toDisplayString(item.location),
                    1
                    /* TEXT */
                  ),
                  vue.createElementVNode("view", { class: "attribute" }, [
                    vue.createVNode(_component_AttributeBox, {
                      class: "a1",
                      color: "#ff9439",
                      num: item.skill
                    }, null, 8, ["num"]),
                    vue.createVNode(_component_AttributeBox, {
                      class: "a2",
                      color: "#6737bf",
                      num: item.financial
                    }, null, 8, ["num"]),
                    vue.createVNode(_component_AttributeBox, {
                      class: "a3",
                      color: "#ff7339",
                      num: item.emotional
                    }, null, 8, ["num"])
                  ]),
                  vue.createElementVNode("view", { class: "row-box" }, [
                    vue.createElementVNode(
                      "view",
                      { class: "releaseTime" },
                      vue.toDisplayString(item.updateTime.replace("T", " ")),
                      1
                      /* TEXT */
                    ),
                    vue.createElementVNode(
                      "view",
                      { class: "cost" },
                      " ￥ " + vue.toDisplayString(item.price),
                      1
                      /* TEXT */
                    )
                  ])
                ])
              ]);
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ])
      ])
    ]);
  }
  const PagesMainIndex = /* @__PURE__ */ _export_sfc(_sfc_main$o, [["render", _sfc_render$n], ["__file", "E:/HBuilderX/Projects/职达/pages/main/index.vue"]]);
  const _imports_0$5 = "/static/study/star.svg";
  const _sfc_main$n = {
    components: {
      TopNavBar,
      SearchBar,
      AttributeBox
    },
    data() {
      return {
        topBanner: [
          {
            img_url: "/static/testAvatar.jpg"
          },
          {
            img_url: "/static/testAvatar.jpg"
          }
        ],
        consultList: [
          {
            img_url: "static/logo.png",
            name: "创赛培训",
            total: 30,
            finished: 12
          }
        ],
        coursePage: 0,
        courseData: []
      };
    },
    methods: {
      toCourse(course) {
        uni.setStorageSync("courseId", course.courseId);
        uni.navigateTo({
          url: "/pages/course/course"
        });
      },
      loadMoreCorseData() {
        uni.request({
          url: this.$url + "/course/getCourses/" + this.coursePage + "/5",
          method: "GET",
          success: (res) => {
            res.data.data.records.forEach((item, index) => {
              this.courseData.push(item);
            });
            this.coursePage += 1;
          }
        });
      }
    },
    mounted() {
      var that = this;
      uni.$on("reloadData", function() {
        that.coursePage = 0;
        that.courseData = [];
        that.loadMoreCorseData();
      });
    },
    beforeDestroy() {
      uni.$off("reloadData");
    }
  };
  function _sfc_render$m(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_TopNavBar = vue.resolveComponent("TopNavBar");
    const _component_SearchBar = vue.resolveComponent("SearchBar");
    const _component_AttributeBox = vue.resolveComponent("AttributeBox");
    return vue.openBlock(), vue.createElementBlock("view", null, [
      vue.createVNode(_component_TopNavBar, { title: "学习" }),
      vue.createVNode(_component_SearchBar),
      vue.createElementVNode("view", { class: "banner-box" }, [
        vue.createElementVNode("view", { class: "box-1" }, [
          vue.createElementVNode("swiper", {
            class: "swiper",
            "indicator-dots": false,
            autoplay: true,
            interval: 3e3,
            duration: 1500
          }, [
            (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList($data.topBanner, (item, index) => {
                return vue.openBlock(), vue.createElementBlock("swiper-item", {
                  class: "banner",
                  key: index
                }, [
                  vue.createElementVNode("image", {
                    src: item.img_url,
                    mode: "aspectFill"
                  }, null, 8, ["src"])
                ]);
              }),
              128
              /* KEYED_FRAGMENT */
            ))
          ])
        ])
      ]),
      vue.createElementVNode("view", { class: "course-box" }, [
        vue.createElementVNode("view", { class: "box-1" }, [
          vue.createElementVNode("view", { class: "title" }, "课程")
        ]),
        vue.createElementVNode("view", { class: "box-2" }, [
          (vue.openBlock(true), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList($data.courseData, (item, index) => {
              return vue.openBlock(), vue.createElementBlock("view", {
                class: "course-item",
                key: index,
                onClick: ($event) => $options.toCourse(item)
              }, [
                vue.createElementVNode("view", { class: "img-box" }, [
                  vue.createElementVNode("image", {
                    class: "img",
                    src: this.$url + "/file/getImage/" + item.courseCover,
                    mode: "aspectFill"
                  }, null, 8, ["src"]),
                  vue.createElementVNode("view", { class: "rating-box" }, [
                    vue.createElementVNode("image", {
                      src: _imports_0$5,
                      mode: "aspectFill"
                    }),
                    vue.createElementVNode(
                      "view",
                      { class: "rating" },
                      vue.toDisplayString(item.score),
                      1
                      /* TEXT */
                    )
                  ])
                ]),
                vue.createElementVNode(
                  "view",
                  { class: "name" },
                  vue.toDisplayString(item.courseTitle),
                  1
                  /* TEXT */
                ),
                vue.createElementVNode("view", { class: "attribute" }, [
                  vue.createVNode(_component_AttributeBox, {
                    class: "a1",
                    color: "#ff9439",
                    num: item.skill
                  }, null, 8, ["num"]),
                  vue.createVNode(_component_AttributeBox, {
                    class: "a2",
                    color: "#6737bf",
                    num: item.financial
                  }, null, 8, ["num"]),
                  vue.createVNode(_component_AttributeBox, {
                    class: "a3",
                    color: "#ff7339",
                    num: item.emotional
                  }, null, 8, ["num"])
                ]),
                vue.createElementVNode(
                  "view",
                  { class: "cost" },
                  " ￥ " + vue.toDisplayString(item.price),
                  1
                  /* TEXT */
                )
              ], 8, ["onClick"]);
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ])
      ]),
      vue.createElementVNode("view", { class: "consult-box" }, [
        vue.createElementVNode("view", { class: "box-1" }, [
          vue.createElementVNode("view", { class: "title" }, " 咨询 ")
        ]),
        vue.createElementVNode("view", { class: "box-2" }, [
          (vue.openBlock(true), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList($data.consultList, (item, index) => {
              return vue.openBlock(), vue.createElementBlock("view", {
                class: "consult-item",
                key: index
              }, [
                vue.createElementVNode("view", { class: "img-box" }, [
                  vue.createElementVNode("image", {
                    src: item.img_url,
                    mode: "aspectFill"
                  }, null, 8, ["src"])
                ]),
                vue.createElementVNode(
                  "view",
                  { class: "name" },
                  vue.toDisplayString(item.name),
                  1
                  /* TEXT */
                ),
                vue.createElementVNode("view", { class: "progress-box" }, [
                  vue.createElementVNode("view", { class: "progress-bar-box" }, [
                    vue.createElementVNode("view", { class: "progress-bar" })
                  ]),
                  vue.createElementVNode(
                    "view",
                    { class: "progress-txt" },
                    vue.toDisplayString(item.finished) + "/" + vue.toDisplayString(item.total),
                    1
                    /* TEXT */
                  )
                ])
              ]);
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ])
      ])
    ]);
  }
  const PagesMainStudy = /* @__PURE__ */ _export_sfc(_sfc_main$n, [["render", _sfc_render$m], ["__file", "E:/HBuilderX/Projects/职达/pages/main/study.vue"]]);
  function formatTimeMS(ms) {
    const current = new Date(Date.now());
    const target = new Date(ms);
    if (current.getFullYear() === target.getFullYear() && current.getMonth() === target.getMonth() && current.getDate() === target.getDate()) {
      return target.getHours() + ":" + (target.getMinutes() < 10 ? "0" : "") + target.getMinutes();
    } else {
      return target.getMonth() + 1 + "月" + target.getDate() + "日";
    }
  }
  const _sfc_main$m = {
    components: {
      TopNavBar,
      SearchBar
    },
    data() {
      return {
        groupData: [],
        groupRuntimeData: []
      };
    },
    methods: {
      gotoDialog(group_id, group_name, index) {
        this.groupData[index].unread = 0;
        uni.setStorageSync("group_id", group_id);
        uni.setStorageSync("group_name", group_name);
        uni.navigateTo({
          url: "/pages/chat/dialog"
        });
      }
    },
    mounted() {
      uni.request({
        url: this.$url + "/ws/getGroupsInfo",
        header: {
          "token": uni.getStorageSync("token")
        },
        success: (res) => {
          this.groupData = res.data.data;
          this.groupData.forEach((item, index) => {
            uni.request({
              url: this.$url + "/message/getGroupMessages/" + item.group_id + "/0/1",
              header: {
                "token": uni.getStorageSync("token")
              },
              success: (msgData) => {
                let record = msgData.data.data.records[0];
                if (record != null) {
                  item.msg = record.msg;
                  item.time = formatTimeMS(parseInt(record.createTime));
                  item.unread = 0;
                } else {
                  item.msg = "群聊暂无消息";
                  item.time = "0:00";
                  item.unread = 0;
                }
              }
            });
          });
        }
      });
      uni.onSocketMessage((res) => {
        formatAppLog("log", "at pages/chat/chat.vue:85", res.data);
        let jsonObj = JSON.parse(res.data);
        this.groupData.forEach((item, index) => {
          if (jsonObj.group == item.group_id) {
            item.msg = jsonObj.msg;
            item.time = formatTimeMS((/* @__PURE__ */ new Date()).getTime());
            item.unread += 1;
          }
        });
      });
    }
  };
  function _sfc_render$l(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_TopNavBar = vue.resolveComponent("TopNavBar");
    const _component_SearchBar = vue.resolveComponent("SearchBar");
    return vue.openBlock(), vue.createElementBlock("view", null, [
      vue.createVNode(_component_TopNavBar, {
        title: "消息",
        showBackBtn: "true"
      }),
      vue.createVNode(_component_SearchBar),
      (vue.openBlock(true), vue.createElementBlock(
        vue.Fragment,
        null,
        vue.renderList($data.groupData, (item, index) => {
          return vue.openBlock(), vue.createElementBlock("view", {
            class: "chat-item-box",
            key: index,
            onClick: ($event) => $options.gotoDialog(item.group_id, item.group_name, index)
          }, [
            vue.createElementVNode("view", { class: "avatar" }, [
              vue.createElementVNode("image", {
                src: item.group_avatar,
                mode: "aspectFill"
              }, null, 8, ["src"])
            ]),
            vue.createElementVNode("view", { class: "txt" }, [
              vue.createElementVNode("view", { class: "line1" }, [
                vue.createElementVNode(
                  "view",
                  { class: "name" },
                  vue.toDisplayString(item.group_name),
                  1
                  /* TEXT */
                ),
                vue.createElementVNode(
                  "view",
                  { class: "time" },
                  vue.toDisplayString(item.time),
                  1
                  /* TEXT */
                )
              ]),
              vue.createElementVNode("view", { class: "line2" }, [
                vue.createElementVNode(
                  "text",
                  { class: "msg" },
                  vue.toDisplayString(item.msg),
                  1
                  /* TEXT */
                ),
                item.unread > 0 ? (vue.openBlock(), vue.createElementBlock("view", {
                  key: 0,
                  class: "unread-box"
                }, [
                  item.unread < 2 ? (vue.openBlock(), vue.createElementBlock(
                    "view",
                    {
                      key: 0,
                      class: "unread-txt"
                    },
                    vue.toDisplayString(item.unread),
                    1
                    /* TEXT */
                  )) : (vue.openBlock(), vue.createElementBlock("view", {
                    key: 1,
                    class: "unread-txt"
                  }, "99"))
                ])) : vue.createCommentVNode("v-if", true)
              ])
            ])
          ], 8, ["onClick"]);
        }),
        128
        /* KEYED_FRAGMENT */
      ))
    ]);
  }
  const PagesChatChat = /* @__PURE__ */ _export_sfc(_sfc_main$m, [["render", _sfc_render$l], ["__file", "E:/HBuilderX/Projects/职达/pages/chat/chat.vue"]]);
  const _imports_0$4 = "/static/send.svg";
  const _imports_1$3 = "/static/34676.png";
  const _sfc_main$l = {
    components: {
      TopNavBar,
      AttributeBox
    },
    data() {
      return {
        finishedCourseList: [
          {
            name: "UE5大师课",
            color: "#ff9439"
          },
          {
            name: "unity",
            color: "#ff7339"
          },
          {
            name: "计算机图形学",
            color: "#ff7339"
          },
          {
            name: "北大创业指导及生涯规划",
            color: "#ff9439"
          }
        ],
        userData: [],
        a1: 0.5,
        a2: 0.3,
        a3: 1
      };
    },
    methods: {
      toEditProfile() {
        uni.navigateTo({
          url: "/pages/edit-profile/edit-profile"
        });
      },
      loadMineData() {
        uni.request({
          url: this.$url + "/user/getUserInfo",
          header: {
            "token": uni.getStorageSync("token")
          },
          method: "POST",
          success: (res) => {
            this.userData = res.data.data;
          }
        });
      }
    },
    mounted() {
      var that = this;
      uni.$on("reloadData", function() {
        that.loadMineData();
      });
    },
    beforeDestroy() {
      uni.$off("reloadData");
    }
  };
  function _sfc_render$k(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_TopNavBar = vue.resolveComponent("TopNavBar");
    const _component_AttributeBox = vue.resolveComponent("AttributeBox");
    return vue.openBlock(), vue.createElementBlock("view", null, [
      vue.createVNode(_component_TopNavBar, {
        title: "个人",
        showListBtn: "true"
      }),
      vue.createElementVNode("view", {
        class: "profile-img-box",
        onClick: _cache[0] || (_cache[0] = ($event) => $options.toEditProfile())
      }, [
        vue.createElementVNode("image", {
          class: "img",
          src: this.$url + "/file/getImage/" + $data.userData.header,
          mode: "scaleToFill"
        }, null, 8, ["src"])
      ]),
      vue.createElementVNode("view", { class: "profile-txt-box" }, [
        vue.createElementVNode(
          "text",
          { class: "name" },
          vue.toDisplayString($data.userData.nickname),
          1
          /* TEXT */
        ),
        vue.createElementVNode("text", { class: "type" }, "免费用户")
      ]),
      vue.createElementVNode("view", { class: "integral-box" }, [
        vue.createElementVNode("view", { class: "total" }, [
          vue.createElementVNode(
            "text",
            null,
            "总积分：" + vue.toDisplayString($data.userData.skill + $data.userData.financial + $data.userData.emotional),
            1
            /* TEXT */
          )
        ]),
        vue.createElementVNode("view", { class: "classify" }, [
          vue.createElementVNode("view", { class: "class" }, [
            vue.createElementVNode("view", {
              class: "box",
              style: { "background": "#ff9439", "boxShadow": "4px 4px 8px 4px rgba(255,148,57, 0.2)" }
            }, [
              vue.createElementVNode("image", {
                class: "icon",
                src: _imports_0$4,
                mode: "aspectFit"
              }),
              vue.createElementVNode(
                "view",
                { class: "num" },
                vue.toDisplayString($data.userData.skill),
                1
                /* TEXT */
              )
            ]),
            vue.createElementVNode("view", {
              class: "type",
              style: { "color": "#ff9439" }
            }, "技能")
          ]),
          vue.createElementVNode("view", { class: "class" }, [
            vue.createElementVNode("view", {
              class: "box",
              style: { "background": "#6737bf", "boxShadow": "4px 4px 8px 4px rgba(103,55,191, 0.2)" }
            }, [
              vue.createElementVNode("image", {
                class: "icon",
                src: _imports_0$4,
                mode: "aspectFit"
              }),
              vue.createElementVNode(
                "view",
                { class: "num" },
                vue.toDisplayString($data.userData.financial),
                1
                /* TEXT */
              )
            ]),
            vue.createElementVNode("view", {
              class: "type",
              style: { "color": "#6737bf" }
            }, "财商")
          ]),
          vue.createElementVNode("view", { class: "class" }, [
            vue.createElementVNode("view", {
              class: "box",
              style: { "background": "#ff7339", "boxShadow": "4px 4px 8px 4px rgba(255,115,57, 0.2)" }
            }, [
              vue.createElementVNode("image", {
                class: "icon",
                src: _imports_0$4,
                mode: "aspectFit"
              }),
              vue.createElementVNode(
                "view",
                { class: "num" },
                vue.toDisplayString($data.userData.emotional),
                1
                /* TEXT */
              )
            ]),
            vue.createElementVNode("view", {
              class: "type",
              style: { "color": "#ff7339" }
            }, "情商")
          ])
        ])
      ]),
      vue.createElementVNode("view", { class: "finished-course-box" }, [
        vue.createElementVNode("view", { class: "title" }, "已学课程"),
        vue.createElementVNode("view", { class: "list" }, [
          (vue.openBlock(true), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList($data.finishedCourseList, (item, index) => {
              return vue.openBlock(), vue.createElementBlock(
                "view",
                {
                  class: "finished-course",
                  key: index,
                  style: vue.normalizeStyle({ background: item.color })
                },
                vue.toDisplayString(item.name),
                5
                /* TEXT, STYLE */
              );
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ])
      ]),
      vue.createElementVNode("view", { class: "personal-reports-box" }, [
        vue.createElementVNode("view", { class: "box-1" }, [
          vue.createElementVNode("view", { class: "title" }, "个人报告"),
          vue.createElementVNode("view", { class: "see-all" }, "查看全部")
        ]),
        vue.createElementVNode("view", { class: "box-2" }, [
          vue.createElementVNode("view", { class: "txt-box" }, [
            vue.createElementVNode("view", { class: "title" }, "综合评估"),
            vue.createElementVNode("view", { class: "content" }, [
              vue.createTextVNode(" 核心胜任力报告"),
              vue.createElementVNode("br"),
              vue.createTextVNode(" MIBTI报告"),
              vue.createElementVNode("br"),
              vue.createTextVNode(" 雷达图"),
              vue.createElementVNode("br")
            ])
          ])
        ])
      ]),
      vue.createElementVNode("view", { class: "upgrade-plan-box" }, [
        vue.createElementVNode("view", { class: "title" }, "升级计划"),
        vue.createElementVNode("view", { class: "plan-list" }, [
          vue.createElementVNode("view", { class: "plan-box" })
        ])
      ]),
      vue.createElementVNode("view", { class: "ai-title" }, " 课程规划 "),
      vue.createElementVNode("view", { class: "ai-box" }, [
        vue.createElementVNode("view", { class: "box-1" }, [
          vue.createElementVNode("view", { class: "title-box" }, [
            vue.createElementVNode("view", { class: "title" }, " Best Seller ")
          ])
        ]),
        vue.createElementVNode("view", { class: "box-2" }, [
          vue.createElementVNode("view", { class: "left-box" }, [
            vue.createElementVNode("view", { class: "txt-1" }, " 当前规划 "),
            vue.createElementVNode("view", { class: "txt-2" }, " 游戏开发工程师 "),
            vue.createElementVNode("view", { class: "txt-3" }, " By:职达AI "),
            vue.createElementVNode("view", { class: "bottom-box" }, [
              vue.createElementVNode("view", { class: "btn-box" }, [
                vue.createElementVNode("image", {
                  src: _imports_0$4,
                  mode: "aspectFill"
                })
              ]),
              vue.createElementVNode("view", { class: "txt-4" }, " AI规划 ")
            ])
          ]),
          vue.createElementVNode("view", { class: "right-box" }, [
            vue.createElementVNode("image", {
              src: _imports_1$3,
              mode: "scaleToFill"
            })
          ])
        ]),
        vue.createElementVNode("view", { class: "box-3" }, [
          vue.createVNode(_component_AttributeBox, {
            showNum: false,
            color: "#ff9439"
          }),
          vue.createElementVNode("view", { class: "progress-bar-box" }, [
            vue.createElementVNode("view", {
              class: "progress-bar",
              style: vue.normalizeStyle([{ width: 0.5 * 100 + "%" }, { "background-color": "#ff9439" }])
            })
          ]),
          vue.createVNode(_component_AttributeBox, {
            showNum: false,
            color: "#6737bf"
          }),
          vue.createElementVNode("view", { class: "progress-bar-box" }, [
            vue.createElementVNode("view", {
              class: "progress-bar",
              style: vue.normalizeStyle([{ width: 0.3 * 100 + "%" }, { "background-color": "#6737bf" }])
            })
          ]),
          vue.createVNode(_component_AttributeBox, {
            showNum: false,
            color: "#ff7339"
          }),
          vue.createElementVNode("view", { class: "progress-bar-box" }, [
            vue.createElementVNode("view", {
              class: "progress-bar",
              style: vue.normalizeStyle([{ width: 0.7 * 100 + "%" }, { "background-color": "#ff7339" }])
            })
          ])
        ])
      ]),
      vue.createElementVNode("view", { class: "study-time-box" }, [
        vue.createElementVNode("view", { class: "title" }, " 学习时长 "),
        vue.createElementVNode("view", { class: "box-1" }),
        vue.createElementVNode("view", { class: "box-2" }, [
          vue.createElementVNode("view", { class: "tab-box-active" }, [
            vue.createElementVNode("text", null, "Course Included")
          ]),
          vue.createElementVNode("view", { class: "tab-box" }, [
            vue.createElementVNode("text", null, "Course Description")
          ]),
          vue.createElementVNode("view", { class: "tab-box" }, [
            vue.createElementVNode("text", null, "What I Will Learn?")
          ])
        ])
      ])
    ]);
  }
  const PagesMainMine = /* @__PURE__ */ _export_sfc(_sfc_main$l, [["render", _sfc_render$k], ["__file", "E:/HBuilderX/Projects/职达/pages/main/mine.vue"]]);
  const _sfc_main$k = {
    components: {
      TopNavBar
    },
    data() {
      return {
        talkList: [],
        ajax: {
          rows: 20,
          //每页数量
          page: 1,
          //页码
          flag: true,
          // 请求开关
          loading: true,
          // 加载中
          loadText: "正在获取消息"
        },
        content: ""
      };
    },
    mounted() {
      this.getHistoryMsg();
      uni.onSocketMessage((res) => {
        let jsonObj = JSON.parse(res.data);
        if (jsonObj.group == uni.getStorageSync("group_id")) {
          let data = {
            "id": (/* @__PURE__ */ new Date()).getTime(),
            "content": jsonObj.msg,
            "type": 0,
            "pic": "/static/logo.png"
          };
          this.talkList.push(data);
          this.$nextTick(() => {
            uni.pageScrollTo({
              scrollTop: 999999,
              // 设置一个超大值，以保证滚动条滚动到底部
              duration: 200
            });
          });
        }
      });
    },
    onPageScroll(e) {
      if (e.scrollTop < 5) {
        this.getHistoryMsg();
      }
    },
    methods: {
      getGroupName() {
        return uni.getStorageSync("group_name");
      },
      // 获取历史消息
      getHistoryMsg() {
        if (!this.ajax.flag) {
          return;
        }
        let get = async () => {
          this.hideLoadTips();
          this.ajax.flag = false;
          let data = await this.joinHistoryMsg();
          formatAppLog("log", "at pages/chat/dialog.vue:90", data);
          let selector = "";
          if (this.ajax.page > 1) {
            selector = `#msg-${this.talkList[0].id}`;
          } else {
            selector = `#msg-${data[data.length - 1].id}`;
          }
          this.talkList = [...data, ...this.talkList];
          this.$nextTick(() => {
            this.setPageScrollTo(selector);
            this.hideLoadTips(true);
            if (data.length < this.ajax.rows)
              ;
            else {
              this.ajax.page++;
              this.ajax.flag = true;
              setTimeout(() => {
              }, 200);
            }
          });
        };
        get();
      },
      // 拼接历史记录消息，正式项目可替换为请求历史记录接口
      joinHistoryMsg() {
        let join = async () => {
          let arr = [];
          let res = await uni.request({
            url: this.$url + "/message/getGroupMessages/" + uni.getStorageSync("group_id") + `/${this.ajax.page - 1}/${this.ajax.rows}`,
            header: {
              "token": uni.getStorageSync("token")
            }
          });
          formatAppLog("log", "at pages/chat/dialog.vue:138", res);
          let records = res.data.data.records;
          for (let i = 0; i < this.ajax.rows; i++) {
            if (records[i] == null)
              break;
            let headerData = await uni.request({
              url: this.$url + "/user/getHeader/" + records[i].comeFrom,
              header: {
                "token": uni.getStorageSync("token")
              }
            });
            arr.push({
              "id": records[i].messageId,
              // 消息的ID
              "content": records[i].msg,
              // 消息内容
              "type": records[i].comeFrom == uni.getStorageSync("username") ? 1 : 0,
              // 此为消息类别，设 1 为发出去的消息，0 为收到对方的消息,
              "pic": this.$url + "/file/getImage/" + headerData.data.data
              // 头像
            });
          }
          arr.reverse();
          return arr;
        };
        return new Promise((done, fail) => {
          let data = join();
          done(data);
        });
      },
      // 设置页面滚动位置
      setPageScrollTo(selector) {
        let view = uni.createSelectorQuery().in(this).select(selector);
        view.boundingClientRect((res) => {
          uni.pageScrollTo({
            scrollTop: res.top - 30,
            // -30 为多显示出大半个消息的高度，示意上面还有信息。
            duration: 0
          });
        }).exec();
      },
      // 隐藏加载提示
      hideLoadTips(flag) {
        if (flag) {
          this.ajax.loadText = "消息获取成功";
          setTimeout(() => {
            this.ajax.loading = false;
          }, 300);
        } else {
          this.ajax.loading = true;
          this.ajax.loadText = "正在获取消息";
        }
      },
      // 发送信息
      async send() {
        if (!this.content) {
          uni.showToast({
            title: "请输入有效的内容",
            icon: "none"
          });
          return;
        }
        let jsonObj = {
          group: uni.getStorageSync("group_id"),
          msg: this.content
        };
        uni.sendSocketMessage({
          data: JSON.stringify(jsonObj)
        });
        let userData = await uni.request({
          url: this.$url + "/user/getUserInfo",
          header: {
            "token": uni.getStorageSync("token")
          },
          method: "POST"
        });
        let data = {
          "id": (/* @__PURE__ */ new Date()).getTime(),
          "content": this.content,
          "type": 1,
          "pic": this.$url + "/file/getImage/" + userData.data.data.header
        };
        this.talkList.push(data);
        this.$nextTick(() => {
          this.content = "";
          uni.pageScrollTo({
            scrollTop: 999999,
            // 设置一个超大值，以保证滚动条滚动到底部
            duration: 200
          });
        });
      }
    }
  };
  function _sfc_render$j(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_TopNavBar = vue.resolveComponent("TopNavBar");
    return vue.openBlock(), vue.createElementBlock(
      vue.Fragment,
      null,
      [
        vue.createVNode(_component_TopNavBar, {
          title: $options.getGroupName(),
          showBackBtn: "true"
        }, null, 8, ["title"]),
        vue.createElementVNode("view", null, [
          vue.createElementVNode(
            "view",
            {
              class: vue.normalizeClass(["tips color_fff size_12 align_c", { "show": $data.ajax.loading }]),
              onClick: _cache[0] || (_cache[0] = (...args) => $options.getHistoryMsg && $options.getHistoryMsg(...args))
            },
            vue.toDisplayString($data.ajax.loadText),
            3
            /* TEXT, CLASS */
          ),
          vue.createElementVNode("view", {
            class: "box-1",
            id: "list-box"
          }, [
            vue.createElementVNode("view", { class: "talk-list" }, [
              (vue.openBlock(true), vue.createElementBlock(
                vue.Fragment,
                null,
                vue.renderList($data.talkList, (item, index) => {
                  return vue.openBlock(), vue.createElementBlock("view", {
                    key: index,
                    id: `msg-${item.id}`
                  }, [
                    vue.createElementVNode(
                      "view",
                      {
                        class: vue.normalizeClass(["item flex_col", item.type == 1 ? "push" : "pull"])
                      },
                      [
                        vue.createElementVNode("image", {
                          src: item.pic,
                          mode: "aspectFill",
                          class: "pic"
                        }, null, 8, ["src"]),
                        vue.createElementVNode(
                          "view",
                          { class: "content" },
                          vue.toDisplayString(item.content),
                          1
                          /* TEXT */
                        )
                      ],
                      2
                      /* CLASS */
                    )
                  ], 8, ["id"]);
                }),
                128
                /* KEYED_FRAGMENT */
              ))
            ])
          ]),
          vue.createElementVNode("view", { class: "box-2" }, [
            vue.createElementVNode("view", { class: "flex_col" }, [
              vue.createElementVNode("view", { class: "flex_grow" }, [
                vue.withDirectives(vue.createElementVNode(
                  "input",
                  {
                    type: "text",
                    class: "content",
                    "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $data.content = $event),
                    placeholder: "请输入聊天内容",
                    "placeholder-style": "color:#aaa;",
                    "cursor-spacing": 6
                  },
                  null,
                  512
                  /* NEED_PATCH */
                ), [
                  [vue.vModelText, $data.content]
                ])
              ]),
              vue.createElementVNode("view", {
                class: "send",
                onClick: _cache[2] || (_cache[2] = (...args) => $options.send && $options.send(...args))
              }, [
                vue.createElementVNode("image", {
                  src: _imports_0$4,
                  mode: "scaleToFill",
                  style: { "width": "20px", "height": "20px" }
                })
              ])
            ])
          ])
        ])
      ],
      64
      /* STABLE_FRAGMENT */
    );
  }
  const PagesChatDialog = /* @__PURE__ */ _export_sfc(_sfc_main$k, [["render", _sfc_render$j], ["__file", "E:/HBuilderX/Projects/职达/pages/chat/dialog.vue"]]);
  const _sfc_main$j = {
    data() {
      return {
        username: "",
        code: "",
        pwd: "",
        countdown: 0,
        // 倒计时初始时间
        timer: null,
        // 定时器
        canSend: true
      };
    },
    computed: {
      sendTxt() {
        return this.countdown > 0 ? `${this.countdown}秒后重发` : "发送验证码";
      }
    },
    methods: {
      getCode() {
        if (this.canSend) {
          uni.request({
            url: this.$url + "/user/sendCode/" + this.username,
            method: "GET",
            success: (res) => {
              formatAppLog("log", "at pages/account/signup.vue:70", res);
              this.startCountdown();
            }
          });
        }
      },
      startCountdown() {
        if (this.timer) {
          clearInterval(this.timer);
        }
        this.countdown = 60;
        this.canSend = false;
        this.timer = setInterval(() => {
          if (this.countdown > 0) {
            this.countdown--;
          } else {
            clearInterval(this.timer);
            this.canSend = true;
          }
        }, 1e3);
      },
      signup() {
        uni.request({
          url: this.$url + "/user/register",
          data: {
            "username": this.username,
            "password": this.pwd,
            "code": this.code
          },
          method: "POST",
          success: (res) => {
            formatAppLog("log", "at pages/account/signup.vue:107", res);
            if (res.data.code == 200) {
              uni.showToast({
                title: "注册成功",
                icon: "success"
              });
              uni.navigateTo({
                url: "/pages/account/login"
              });
            } else {
              if (res.data.msg != null) {
                uni.showToast({
                  title: res.data.msg,
                  icon: "none"
                });
              } else {
                uni.showToast({
                  title: "手机号不存在",
                  icon: "none"
                });
              }
            }
          }
        });
      },
      toLogin() {
        uni.navigateBack();
      }
    }
  };
  function _sfc_render$i(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      vue.Fragment,
      null,
      [
        vue.createElementVNode("view", { class: "img-box" }, [
          vue.createElementVNode("image", { src: _imports_0$7 })
        ]),
        vue.createElementVNode("view", { class: "signup-box" }, [
          vue.createElementVNode("view", { class: "title" }, " 手机号 "),
          vue.createElementVNode("view", { class: "box-1" }, [
            vue.withDirectives(vue.createElementVNode(
              "input",
              {
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.username = $event),
                type: "number",
                style: { "width": "100%" }
              },
              null,
              512
              /* NEED_PATCH */
            ), [
              [vue.vModelText, $data.username]
            ])
          ]),
          vue.createElementVNode("view", { class: "title" }, " 验证码 "),
          vue.createElementVNode("view", { class: "box-1" }, [
            vue.withDirectives(vue.createElementVNode(
              "input",
              {
                "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $data.code = $event),
                type: "number"
              },
              null,
              512
              /* NEED_PATCH */
            ), [
              [vue.vModelText, $data.code]
            ]),
            vue.createElementVNode(
              "view",
              {
                class: "send-btn",
                onClick: _cache[2] || (_cache[2] = ($event) => $options.getCode())
              },
              vue.toDisplayString($options.sendTxt),
              1
              /* TEXT */
            )
          ]),
          vue.createElementVNode("view", { class: "title" }, " 新的密码 "),
          vue.createElementVNode("view", { class: "box-1" }, [
            vue.withDirectives(vue.createElementVNode(
              "input",
              {
                "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => $data.pwd = $event),
                password: "true",
                style: { "width": "100%" }
              },
              null,
              512
              /* NEED_PATCH */
            ), [
              [vue.vModelText, $data.pwd]
            ])
          ]),
          vue.createElementVNode("view", { class: "agreement" }, " 确认阅读并同意 "),
          vue.createElementVNode("view", { class: "signup-btn-box" }, [
            vue.createElementVNode("view", {
              class: "signup-btn",
              onClick: _cache[4] || (_cache[4] = ($event) => $options.signup())
            }, [
              vue.createElementVNode("text", { class: "signup-txt" }, "注册")
            ])
          ])
        ]),
        vue.createElementVNode("view", { class: "login-box" }, [
          vue.createElementVNode("view", { class: "txt" }, " 已有账号？ "),
          vue.createElementVNode("view", {
            class: "tologin",
            onClick: _cache[5] || (_cache[5] = ($event) => $options.toLogin())
          }, " 点击登录 ")
        ])
      ],
      64
      /* STABLE_FRAGMENT */
    );
  }
  const PagesAccountSignup = /* @__PURE__ */ _export_sfc(_sfc_main$j, [["render", _sfc_render$i], ["__file", "E:/HBuilderX/Projects/职达/pages/account/signup.vue"]]);
  const _sfc_main$i = {
    data() {
      return {
        username: "",
        code: "",
        pwd: "",
        countdown: 0,
        // 倒计时初始时间
        timer: null,
        // 定时器
        canSend: true
      };
    },
    computed: {
      sendTxt() {
        return this.countdown > 0 ? `${this.countdown}秒后重发` : "发送验证码";
      }
    },
    methods: {
      getCode() {
        if (this.canSend) {
          uni.request({
            url: this.$url + "/user/sendCode/" + this.username,
            method: "GET",
            success: (res) => {
              formatAppLog("log", "at pages/account/forgetpwd.vue:67", res);
              this.startCountdown();
            }
          });
        }
      },
      startCountdown() {
        if (this.timer) {
          clearInterval(this.timer);
        }
        this.countdown = 60;
        this.canSend = false;
        this.timer = setInterval(() => {
          if (this.countdown > 0) {
            this.countdown--;
          } else {
            clearInterval(this.timer);
            this.canSend = true;
          }
        }, 1e3);
      },
      signup() {
        uni.request({
          url: this.$url + "/user/resetPassword",
          data: {
            "username": this.username,
            "password": this.pwd,
            "code": this.code
          },
          method: "POST",
          success: (res) => {
            formatAppLog("log", "at pages/account/forgetpwd.vue:104", res);
            if (res.data.code == 200) {
              uni.showToast({
                title: "修改成功",
                icon: "success"
              });
              uni.navigateTo({
                url: "/pages/account/login"
              });
            } else {
              if (res.data.msg != null) {
                uni.showToast({
                  title: res.data.msg,
                  icon: "none"
                });
              } else {
                uni.showToast({
                  title: "手机号不存在",
                  icon: "none"
                });
              }
            }
          }
        });
      },
      toLogin() {
        uni.navigateBack();
      }
    }
  };
  function _sfc_render$h(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      vue.Fragment,
      null,
      [
        vue.createElementVNode("view", { class: "img-box" }, [
          vue.createElementVNode("image", { src: _imports_0$7 })
        ]),
        vue.createElementVNode("view", { class: "signup-box" }, [
          vue.createElementVNode("view", { class: "title" }, " 手机号 "),
          vue.createElementVNode("view", { class: "box-1" }, [
            vue.withDirectives(vue.createElementVNode(
              "input",
              {
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.username = $event),
                type: "number",
                style: { "width": "100%" }
              },
              null,
              512
              /* NEED_PATCH */
            ), [
              [vue.vModelText, $data.username]
            ])
          ]),
          vue.createElementVNode("view", { class: "title" }, " 验证码 "),
          vue.createElementVNode("view", { class: "box-1" }, [
            vue.withDirectives(vue.createElementVNode(
              "input",
              {
                "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $data.code = $event),
                type: "number"
              },
              null,
              512
              /* NEED_PATCH */
            ), [
              [vue.vModelText, $data.code]
            ]),
            vue.createElementVNode(
              "view",
              {
                class: "send-btn",
                onClick: _cache[2] || (_cache[2] = ($event) => $options.getCode())
              },
              vue.toDisplayString($options.sendTxt),
              1
              /* TEXT */
            )
          ]),
          vue.createElementVNode("view", { class: "title" }, " 新的密码 "),
          vue.createElementVNode("view", { class: "box-1" }, [
            vue.withDirectives(vue.createElementVNode(
              "input",
              {
                "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => $data.pwd = $event),
                password: "true",
                style: { "width": "100%" }
              },
              null,
              512
              /* NEED_PATCH */
            ), [
              [vue.vModelText, $data.pwd]
            ])
          ]),
          vue.createElementVNode("view", { class: "signup-btn-box" }, [
            vue.createElementVNode("view", {
              class: "signup-btn",
              onClick: _cache[4] || (_cache[4] = ($event) => $options.signup())
            }, [
              vue.createElementVNode("text", { class: "signup-txt" }, "确认")
            ])
          ])
        ]),
        vue.createElementVNode("view", { class: "login-box" }, [
          vue.createElementVNode("view", { class: "txt" }, " 密码已找回？ "),
          vue.createElementVNode("view", {
            class: "tologin",
            onClick: _cache[5] || (_cache[5] = ($event) => $options.toLogin())
          }, " 返回登录 ")
        ])
      ],
      64
      /* STABLE_FRAGMENT */
    );
  }
  const PagesAccountForgetpwd = /* @__PURE__ */ _export_sfc(_sfc_main$i, [["render", _sfc_render$h], ["__file", "E:/HBuilderX/Projects/职达/pages/account/forgetpwd.vue"]]);
  const _imports_0$3 = "/static/blog/share.svg";
  const _imports_1$2 = "/static/blog/like1.svg";
  const _imports_2$3 = "/static/blog/like.svg";
  const _imports_3$2 = "/static/blog/comment.svg";
  const _sfc_main$h = {
    components: {
      SearchBar
    },
    data() {
      return {
        selection: 1,
        page1: 0,
        page2: 0,
        page3: 0,
        blogData: [],
        mineData: [],
        userBlogData: []
      };
    },
    methods: {
      onSelect(i) {
        this.selection = i;
      },
      toPublishBlog() {
        uni.navigateTo({
          url: "/pages/forum-subpage/publish-blog"
        });
      },
      clickLike(blog) {
        uni.request({
          url: this.$url + "/blog/likeBlog/" + blog.blogId,
          header: {
            "token": uni.getStorageSync("token")
          },
          success: (res) => {
            if (res.data.msg == "点赞成功") {
              blog.likes += 1;
              blog.isLike = true;
            } else {
              blog.likes -= 1;
              blog.isLike = false;
            }
          }
        });
      },
      attention(blog) {
        uni.request({
          url: this.$url + "/blog/attention/" + blog.username,
          header: {
            "token": uni.getStorageSync("token")
          },
          success: (res) => {
            uni.showToast({
              title: res.data.msg,
              icon: "none"
            });
            this.mineData = [];
            this.loadMineData();
            if (res.data.msg == "关注成功") {
              this.blogData.forEach((item, index) => {
                if (item.username == blog.username) {
                  item.isAttention = true;
                }
              });
            } else {
              this.blogData.forEach((item, index) => {
                if (item.username == blog.username) {
                  item.isAttention = false;
                }
              });
            }
          }
        });
      },
      toBlog(blog) {
        uni.setStorageSync("blogId", blog.blogId);
        uni.navigateTo({
          url: "/pages/forum-subpage/blog"
        });
      },
      toRelationList() {
        uni.navigateTo({
          url: "/pages/forum-subpage/relation-list"
        });
      },
      initBlog() {
        uni.request({
          url: this.$url + "/blog/initBlog",
          header: {
            "token": uni.getStorageSync("token")
          }
        });
      },
      loadMoreBlogData() {
        uni.request({
          url: this.$url + "/blog/getBlogList/" + this.page1 + "/5",
          header: {
            "token": uni.getStorageSync("token")
          },
          success: (res) => {
            let attention = res.data.data.attention.filter((item) => item.isAttention === 1);
            let records = res.data.data.blog.records;
            records.forEach((item, index) => {
              if (item.resources != null) {
                item.imgList = item.resources.split(",");
              }
              item.isAttention = false;
              item.isOthers = true;
              attention.forEach((attentionItem, attentionIndex) => {
                if (attentionItem.username == item.username) {
                  item.isAttention = true;
                }
              });
              if (item.username == uni.getStorageSync("username")) {
                item.isOthers = false;
              }
              uni.request({
                url: this.$url + "/user/getHeader/" + item.username,
                header: {
                  "token": uni.getStorageSync("token")
                },
                success: (res2) => {
                  item.headerData = res2.data.data;
                }
              });
              uni.request({
                url: this.$url + "/blog/isLike/" + item.blogId,
                header: {
                  "token": uni.getStorageSync("token")
                },
                success: (res2) => {
                  item.isLike = res2.data.data;
                }
              });
              this.blogData.push(item);
            });
            this.page1 += 1;
          }
        });
      },
      loadMineData() {
        uni.request({
          url: this.$url + "/blog/getMyInfo",
          header: {
            "token": uni.getStorageSync("token")
          },
          success: (res) => {
            this.mineData = res.data.data;
          }
        });
      },
      loadMoreUserBlogData() {
        uni.request({
          url: this.$url + "/blog/getUserBlogList/" + uni.getStorageSync("username") + "/" + this.page3 + "/5",
          header: {
            "token": uni.getStorageSync("token")
          },
          success: (res) => {
            res.data.data.records.forEach((item, index) => {
              if (item.resources != null) {
                item.imgList = item.resources.split(",");
              }
              this.userBlogData.push(item);
            });
            this.page3 += 1;
          }
        });
      }
    },
    mounted() {
      var that = this;
      that.initBlog();
      uni.$on("reloadData", function() {
        that.page1 = 1;
        that.page2 = 1;
        that.page3 = 1;
        that.blogData = [];
        that.mineData = [];
        that.userBlogData = [];
        that.loadMoreBlogData();
        that.loadMineData();
        that.loadMoreUserBlogData();
      });
      uni.$on("onReachBottom3", function() {
        if (that.selection == 1) {
          that.loadMoreBlogData();
        } else if (that.selection == 2) {
          that.loadMoreBlogData();
        } else if (that.selection == 3) {
          that.loadMoreUserBlogData();
        }
      });
    },
    beforeDestroy() {
      uni.$off("onReachBottom3");
      uni.$off("reloadData");
    }
  };
  function _sfc_render$g(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_SearchBar = vue.resolveComponent("SearchBar");
    return vue.openBlock(), vue.createElementBlock("view", null, [
      vue.createElementVNode("view", { style: { "height": "20px" } }),
      vue.createVNode(_component_SearchBar),
      vue.createElementVNode("view", { class: "selection-bar" }, [
        vue.createElementVNode("view", {
          class: "selection",
          onClick: _cache[0] || (_cache[0] = ($event) => $options.onSelect(1))
        }, [
          vue.createElementVNode("text", null, "关注"),
          vue.withDirectives(vue.createElementVNode(
            "view",
            { class: "selected" },
            null,
            512
            /* NEED_PATCH */
          ), [
            [vue.vShow, $data.selection == 1]
          ])
        ]),
        vue.createElementVNode("view", {
          class: "selection",
          onClick: _cache[1] || (_cache[1] = ($event) => $options.onSelect(2))
        }, [
          vue.createElementVNode("text", null, "世界"),
          vue.withDirectives(vue.createElementVNode(
            "view",
            { class: "selected" },
            null,
            512
            /* NEED_PATCH */
          ), [
            [vue.vShow, $data.selection == 2]
          ])
        ]),
        vue.createElementVNode("view", {
          class: "selection",
          onClick: _cache[2] || (_cache[2] = ($event) => $options.onSelect(3))
        }, [
          vue.createElementVNode("text", null, "我的"),
          vue.withDirectives(vue.createElementVNode(
            "view",
            { class: "selected" },
            null,
            512
            /* NEED_PATCH */
          ), [
            [vue.vShow, $data.selection == 3]
          ])
        ]),
        vue.createElementVNode("view", { class: "publish-btn-box" }, [
          vue.createElementVNode("view", {
            class: "publish-btn",
            onClick: _cache[3] || (_cache[3] = ($event) => $options.toPublishBlog())
          }, [
            vue.createElementVNode("image", {
              src: _imports_0$4,
              mode: "aspectFill"
            })
          ])
        ])
      ]),
      vue.withDirectives(vue.createElementVNode(
        "view",
        { class: "selection" },
        [
          (vue.openBlock(true), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList($data.blogData, (item, index) => {
              return vue.openBlock(), vue.createElementBlock("view", {
                key: index,
                class: "item"
              }, [
                vue.createElementVNode("view", { class: "top-box" }, [
                  vue.createElementVNode("view", { class: "avatar-box" }, [
                    vue.createElementVNode("image", {
                      src: this.$url + "/file/getImage/" + item.headerData,
                      mode: "aspectFill"
                    }, null, 8, ["src"])
                  ]),
                  vue.createElementVNode("view", { class: "box-2" }, [
                    vue.createElementVNode(
                      "view",
                      { class: "name" },
                      vue.toDisplayString(item.username),
                      1
                      /* TEXT */
                    ),
                    vue.createElementVNode(
                      "view",
                      { class: "time" },
                      vue.toDisplayString(item.createTime.replace("T", " ")),
                      1
                      /* TEXT */
                    )
                  ]),
                  item.isAttention ? (vue.openBlock(), vue.createElementBlock("view", {
                    key: 0,
                    class: "attention-btn-1",
                    onClick: ($event) => $options.attention(item)
                  }, " 已关注 ", 8, ["onClick"])) : item.isOthers ? (vue.openBlock(), vue.createElementBlock("view", {
                    key: 1,
                    class: "attention-btn-2",
                    onClick: ($event) => $options.attention(item)
                  }, " 关注 ", 8, ["onClick"])) : (vue.openBlock(), vue.createElementBlock("view", { key: 2 }))
                ]),
                vue.createElementVNode("view", { class: "main-box" }, [
                  vue.createElementVNode("view", {
                    class: "content-box",
                    onClick: ($event) => $options.toBlog(item)
                  }, [
                    vue.createElementVNode("view", { class: "img-box" }, [
                      (vue.openBlock(true), vue.createElementBlock(
                        vue.Fragment,
                        null,
                        vue.renderList(item.imgList, (img, i) => {
                          return vue.openBlock(), vue.createElementBlock("image", {
                            key: i,
                            src: this.$url + "/file/getImage/" + img,
                            mode: "aspectFill"
                          }, null, 8, ["src"]);
                        }),
                        128
                        /* KEYED_FRAGMENT */
                      ))
                    ]),
                    vue.createElementVNode(
                      "view",
                      { class: "txt" },
                      vue.toDisplayString(item.content),
                      1
                      /* TEXT */
                    )
                  ], 8, ["onClick"]),
                  vue.createElementVNode("view", { class: "location-box" }, " 四川大学江安校区 "),
                  vue.createElementVNode("view", { class: "interaction-box" }, [
                    vue.createElementVNode("view", { class: "share-btn" }, [
                      vue.createElementVNode("image", { src: _imports_0$3 })
                    ]),
                    vue.createElementVNode("view", {
                      class: "love-btn",
                      onClick: ($event) => $options.clickLike(item)
                    }, [
                      item.isLike ? (vue.openBlock(), vue.createElementBlock("image", {
                        key: 0,
                        src: _imports_1$2
                      })) : (vue.openBlock(), vue.createElementBlock("image", {
                        key: 1,
                        src: _imports_2$3
                      })),
                      vue.createElementVNode(
                        "text",
                        null,
                        vue.toDisplayString(item.likes),
                        1
                        /* TEXT */
                      )
                    ], 8, ["onClick"]),
                    vue.createElementVNode("view", {
                      class: "message-btn",
                      onClick: ($event) => $options.toBlog(item)
                    }, [
                      vue.createElementVNode("image", { src: _imports_3$2 }),
                      vue.createElementVNode(
                        "text",
                        null,
                        vue.toDisplayString(item.reviews),
                        1
                        /* TEXT */
                      )
                    ], 8, ["onClick"])
                  ])
                ])
              ]);
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ],
        512
        /* NEED_PATCH */
      ), [
        [vue.vShow, $data.selection == 1]
      ]),
      vue.withDirectives(vue.createElementVNode(
        "view",
        { class: "selection" },
        [
          (vue.openBlock(true), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList($data.blogData, (item, index) => {
              return vue.openBlock(), vue.createElementBlock("view", {
                key: index,
                class: "item"
              }, [
                vue.createElementVNode("view", { class: "top-box" }, [
                  vue.createElementVNode("view", { class: "avatar-box" }, [
                    vue.createElementVNode("image", {
                      src: this.$url + "/file/getImage/" + item.headerData,
                      mode: "aspectFill"
                    }, null, 8, ["src"])
                  ]),
                  vue.createElementVNode("view", { class: "box-2" }, [
                    vue.createElementVNode(
                      "view",
                      { class: "name" },
                      vue.toDisplayString(item.username),
                      1
                      /* TEXT */
                    ),
                    vue.createElementVNode(
                      "view",
                      { class: "time" },
                      vue.toDisplayString(item.createTime.replace("T", " ")),
                      1
                      /* TEXT */
                    )
                  ]),
                  item.isAttention ? (vue.openBlock(), vue.createElementBlock("view", {
                    key: 0,
                    class: "attention-btn-1",
                    onClick: ($event) => $options.attention(item)
                  }, " 已关注 ", 8, ["onClick"])) : item.isOthers ? (vue.openBlock(), vue.createElementBlock("view", {
                    key: 1,
                    class: "attention-btn-2",
                    onClick: ($event) => $options.attention(item)
                  }, " 关注 ", 8, ["onClick"])) : (vue.openBlock(), vue.createElementBlock("view", { key: 2 }))
                ]),
                vue.createElementVNode("view", { class: "main-box" }, [
                  vue.createElementVNode("view", {
                    class: "content-box",
                    onClick: ($event) => $options.toBlog(item)
                  }, [
                    vue.createElementVNode("view", { class: "img-box" }, [
                      (vue.openBlock(true), vue.createElementBlock(
                        vue.Fragment,
                        null,
                        vue.renderList(item.imgList, (img, i) => {
                          return vue.openBlock(), vue.createElementBlock("image", {
                            key: i,
                            src: this.$url + "/file/getImage/" + img,
                            mode: "aspectFill"
                          }, null, 8, ["src"]);
                        }),
                        128
                        /* KEYED_FRAGMENT */
                      ))
                    ]),
                    vue.createElementVNode(
                      "view",
                      { class: "txt" },
                      vue.toDisplayString(item.content),
                      1
                      /* TEXT */
                    )
                  ], 8, ["onClick"]),
                  vue.createElementVNode("view", { class: "location-box" }, " 四川大学江安校区 "),
                  vue.createElementVNode("view", { class: "interaction-box" }, [
                    vue.createElementVNode("view", { class: "share-btn" }, [
                      vue.createElementVNode("image", { src: _imports_0$3 })
                    ]),
                    vue.createElementVNode("view", {
                      class: "love-btn",
                      onClick: ($event) => $options.clickLike(item)
                    }, [
                      item.isLike ? (vue.openBlock(), vue.createElementBlock("image", {
                        key: 0,
                        src: _imports_1$2
                      })) : (vue.openBlock(), vue.createElementBlock("image", {
                        key: 1,
                        src: _imports_2$3
                      })),
                      vue.createElementVNode(
                        "text",
                        null,
                        vue.toDisplayString(item.likes),
                        1
                        /* TEXT */
                      )
                    ], 8, ["onClick"]),
                    vue.createElementVNode("view", {
                      class: "message-btn",
                      onClick: ($event) => $options.toBlog(item)
                    }, [
                      vue.createElementVNode("image", { src: _imports_3$2 }),
                      vue.createElementVNode(
                        "text",
                        null,
                        vue.toDisplayString(item.reviews),
                        1
                        /* TEXT */
                      )
                    ], 8, ["onClick"])
                  ])
                ])
              ]);
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ],
        512
        /* NEED_PATCH */
      ), [
        [vue.vShow, $data.selection == 2]
      ]),
      vue.withDirectives(vue.createElementVNode(
        "view",
        { class: "selection-3" },
        [
          vue.createElementVNode("view", { class: "profile-box" }, [
            vue.createElementVNode("view", { class: "avatar-box" }, [
              vue.createElementVNode("image", {
                src: _imports_0$7,
                mode: "aspectFill"
              })
            ]),
            vue.createElementVNode(
              "view",
              { class: "name" },
              vue.toDisplayString($data.mineData.username),
              1
              /* TEXT */
            ),
            vue.createElementVNode("view", { class: "location" }, " 四川大学 "),
            vue.createElementVNode("view", { class: "relation-box" }, [
              vue.createElementVNode("view", {
                class: "relation",
                onClick: _cache[4] || (_cache[4] = ($event) => $options.toRelationList())
              }, [
                vue.createElementVNode(
                  "view",
                  { class: "num" },
                  vue.toDisplayString($data.mineData.attention),
                  1
                  /* TEXT */
                ),
                vue.createElementVNode("view", { class: "title" }, " 关注 ")
              ]),
              vue.createElementVNode("view", {
                class: "relation",
                onClick: _cache[5] || (_cache[5] = ($event) => $options.toRelationList())
              }, [
                vue.createElementVNode(
                  "view",
                  { class: "num" },
                  vue.toDisplayString($data.mineData.fans),
                  1
                  /* TEXT */
                ),
                vue.createElementVNode("view", { class: "title" }, " 粉丝 ")
              ]),
              vue.createElementVNode("view", { class: "relation" }, [
                vue.createElementVNode(
                  "view",
                  { class: "num" },
                  vue.toDisplayString($data.mineData.liked),
                  1
                  /* TEXT */
                ),
                vue.createElementVNode("view", { class: "title" }, " 喜欢 ")
              ])
            ])
          ]),
          (vue.openBlock(true), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList($data.userBlogData, (item, index) => {
              return vue.openBlock(), vue.createElementBlock("view", {
                key: index,
                class: "item"
              }, [
                vue.createElementVNode("view", {
                  class: "main-box",
                  onClick: ($event) => $options.toBlog(item)
                }, [
                  vue.createElementVNode(
                    "view",
                    { class: "time" },
                    vue.toDisplayString(item.createTime.replace("T", " ")),
                    1
                    /* TEXT */
                  ),
                  vue.createElementVNode("view", { class: "content-box" }, [
                    vue.createElementVNode("view", { class: "img-box" }, [
                      (vue.openBlock(true), vue.createElementBlock(
                        vue.Fragment,
                        null,
                        vue.renderList(item.imgList, (img, i) => {
                          return vue.openBlock(), vue.createElementBlock("image", {
                            key: i,
                            src: this.$url + "/file/getImage/" + img,
                            mode: "aspectFill"
                          }, null, 8, ["src"]);
                        }),
                        128
                        /* KEYED_FRAGMENT */
                      ))
                    ]),
                    vue.createElementVNode(
                      "view",
                      { class: "txt" },
                      vue.toDisplayString(item.content),
                      1
                      /* TEXT */
                    )
                  ]),
                  vue.createElementVNode("view", { class: "location-box" }, " 四川大学江安校区 ")
                ], 8, ["onClick"])
              ]);
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ],
        512
        /* NEED_PATCH */
      ), [
        [vue.vShow, $data.selection == 3]
      ])
    ]);
  }
  const PagesMainForum = /* @__PURE__ */ _export_sfc(_sfc_main$h, [["render", _sfc_render$g], ["__file", "E:/HBuilderX/Projects/职达/pages/main/forum.vue"]]);
  const _sfc_main$g = {
    components: {
      SearchBar
    },
    data() {
      return {
        selection: 1,
        jobPage1: 1,
        jobPage2: 1,
        jobPage3: 1,
        jobData1: [],
        jobData2: [],
        jobData3: []
      };
    },
    methods: {
      onSelect(i) {
        this.selection = i;
      },
      toJobDetail(jobId) {
        uni.setStorageSync("jobId", jobId);
        uni.navigateTo({
          url: "/pages/job-subpage/job-detail"
        });
      },
      loadJobData(jobType) {
        let currentPage = 1;
        if (jobType == "全职") {
          currentPage = this.jobPage1;
        } else if (jobType == "实习") {
          currentPage = this.jobPage2;
        } else if (jobType == "兼职") {
          currentPage = this.jobPage3;
        }
        uni.request({
          url: this.$url + "/job/getJobList",
          method: "POST",
          header: {
            "token": uni.getStorageSync("token")
          },
          data: {
            "current": currentPage,
            "pageSize": 10,
            "jobType": jobType
          },
          success: (res) => {
            formatAppLog("log", "at pages/main/job.vue:159", res);
            if (jobType == "全职") {
              res.data.data.records.forEach((item, index) => {
                this.jobData1.push(item);
              });
              this.jobPage1 += 1;
            } else if (jobType == "实习") {
              res.data.data.records.forEach((item, index) => {
                this.jobData2.push(item);
              });
              this.jobPage2 += 1;
            } else if (jobType == "兼职") {
              res.data.data.records.forEach((item, index) => {
                this.jobData3.push(item);
              });
              this.jobPage3 += 1;
            }
          }
        });
      }
    },
    mounted() {
      var that = this;
      that.loadJobData("全职");
      that.loadJobData("实习");
      that.loadJobData("兼职");
      uni.$on("onReachBottom5", function() {
        if (that.selection == 1) {
          that.loadJobData("全职");
        } else if (that.selection == 2) {
          that.loadJobData("实习");
        } else if (that.selection == 3) {
          that.loadJobData("兼职");
        }
      });
    },
    beforeDestroy() {
      uni.$off("onReachBottom5");
    }
  };
  function _sfc_render$f(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_SearchBar = vue.resolveComponent("SearchBar");
    return vue.openBlock(), vue.createElementBlock("view", null, [
      vue.createElementVNode("view", { style: { "height": "20px" } }),
      vue.createVNode(_component_SearchBar),
      vue.createElementVNode("view", { class: "selection-bar" }, [
        vue.createElementVNode("view", {
          class: "selection",
          onClick: _cache[0] || (_cache[0] = ($event) => $options.onSelect(1))
        }, [
          vue.createElementVNode("text", null, "全职"),
          vue.withDirectives(vue.createElementVNode(
            "view",
            { class: "selected" },
            null,
            512
            /* NEED_PATCH */
          ), [
            [vue.vShow, $data.selection == 1]
          ])
        ]),
        vue.createElementVNode("view", {
          class: "selection",
          onClick: _cache[1] || (_cache[1] = ($event) => $options.onSelect(2))
        }, [
          vue.createElementVNode("text", null, "实习"),
          vue.withDirectives(vue.createElementVNode(
            "view",
            { class: "selected" },
            null,
            512
            /* NEED_PATCH */
          ), [
            [vue.vShow, $data.selection == 2]
          ])
        ]),
        vue.createElementVNode("view", {
          class: "selection",
          onClick: _cache[2] || (_cache[2] = ($event) => $options.onSelect(3))
        }, [
          vue.createElementVNode("text", null, "兼职"),
          vue.withDirectives(vue.createElementVNode(
            "view",
            { class: "selected" },
            null,
            512
            /* NEED_PATCH */
          ), [
            [vue.vShow, $data.selection == 3]
          ])
        ])
      ]),
      vue.withDirectives(vue.createElementVNode(
        "view",
        { class: "selection" },
        [
          (vue.openBlock(true), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList($data.jobData1, (item, index) => {
              return vue.openBlock(), vue.createElementBlock("view", {
                class: "item-box",
                key: index
              }, [
                vue.createElementVNode("view", { class: "left-box" }, [
                  vue.createElementVNode(
                    "view",
                    { class: "title" },
                    vue.toDisplayString(item.jobName),
                    1
                    /* TEXT */
                  ),
                  vue.createElementVNode(
                    "view",
                    { class: "company" },
                    vue.toDisplayString(item.companyName),
                    1
                    /* TEXT */
                  ),
                  vue.createElementVNode(
                    "view",
                    { class: "location" },
                    " 工作地址：" + vue.toDisplayString(item.companyLocation),
                    1
                    /* TEXT */
                  )
                ]),
                vue.createElementVNode("view", { class: "right-box" }, [
                  vue.createElementVNode(
                    "view",
                    { class: "salary" },
                    vue.toDisplayString(item.salaryDown) + "-" + vue.toDisplayString(item.salaryUp) + "元 ",
                    1
                    /* TEXT */
                  ),
                  vue.createElementVNode("view", { class: "enter-btn-box" }, [
                    vue.createElementVNode("view", {
                      class: "enter-btn",
                      onClick: ($event) => $options.toJobDetail(item.jobId)
                    }, [
                      vue.createElementVNode("image", {
                        src: _imports_0$4,
                        mode: "scaleToFill"
                      })
                    ], 8, ["onClick"])
                  ])
                ])
              ]);
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ],
        512
        /* NEED_PATCH */
      ), [
        [vue.vShow, $data.selection == 1]
      ]),
      vue.withDirectives(vue.createElementVNode(
        "view",
        { class: "selection" },
        [
          (vue.openBlock(true), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList($data.jobData2, (item, index) => {
              return vue.openBlock(), vue.createElementBlock("view", {
                class: "item-box",
                key: index
              }, [
                vue.createElementVNode("view", { class: "left-box" }, [
                  vue.createElementVNode(
                    "view",
                    { class: "title" },
                    vue.toDisplayString(item.jobName),
                    1
                    /* TEXT */
                  ),
                  vue.createElementVNode(
                    "view",
                    { class: "company" },
                    vue.toDisplayString(item.companyName),
                    1
                    /* TEXT */
                  ),
                  vue.createElementVNode(
                    "view",
                    { class: "location" },
                    " 工作地址：" + vue.toDisplayString(item.companyLocation),
                    1
                    /* TEXT */
                  )
                ]),
                vue.createElementVNode("view", { class: "right-box" }, [
                  vue.createElementVNode(
                    "view",
                    { class: "salary" },
                    vue.toDisplayString(item.salaryDown) + "-" + vue.toDisplayString(item.salaryUp) + "元 ",
                    1
                    /* TEXT */
                  ),
                  vue.createElementVNode("view", { class: "enter-btn-box" }, [
                    vue.createElementVNode("view", {
                      class: "enter-btn",
                      onClick: ($event) => $options.toJobDetail(item.jobId)
                    }, [
                      vue.createElementVNode("image", {
                        src: _imports_0$4,
                        mode: "scaleToFill"
                      })
                    ], 8, ["onClick"])
                  ])
                ])
              ]);
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ],
        512
        /* NEED_PATCH */
      ), [
        [vue.vShow, $data.selection == 2]
      ]),
      vue.withDirectives(vue.createElementVNode(
        "view",
        { class: "selection" },
        [
          (vue.openBlock(true), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList($data.jobData3, (item, index) => {
              return vue.openBlock(), vue.createElementBlock("view", {
                class: "item-box",
                key: index
              }, [
                vue.createElementVNode("view", { class: "left-box" }, [
                  vue.createElementVNode(
                    "view",
                    { class: "title" },
                    vue.toDisplayString(item.jobName),
                    1
                    /* TEXT */
                  ),
                  vue.createElementVNode(
                    "view",
                    { class: "company" },
                    vue.toDisplayString(item.companyName),
                    1
                    /* TEXT */
                  ),
                  vue.createElementVNode(
                    "view",
                    { class: "location" },
                    " 工作地址：" + vue.toDisplayString(item.companyLocation),
                    1
                    /* TEXT */
                  )
                ]),
                vue.createElementVNode("view", { class: "right-box" }, [
                  vue.createElementVNode(
                    "view",
                    { class: "salary" },
                    vue.toDisplayString(item.salaryDown) + "-" + vue.toDisplayString(item.salaryUp) + "元 ",
                    1
                    /* TEXT */
                  ),
                  vue.createElementVNode("view", { class: "enter-btn-box" }, [
                    vue.createElementVNode("view", {
                      class: "enter-btn",
                      onClick: ($event) => $options.toJobDetail(item.jobId)
                    }, [
                      vue.createElementVNode("image", {
                        src: _imports_0$4,
                        mode: "scaleToFill"
                      })
                    ], 8, ["onClick"])
                  ])
                ])
              ]);
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ],
        512
        /* NEED_PATCH */
      ), [
        [vue.vShow, $data.selection == 3]
      ])
    ]);
  }
  const PagesMainJob = /* @__PURE__ */ _export_sfc(_sfc_main$g, [["render", _sfc_render$f], ["__file", "E:/HBuilderX/Projects/职达/pages/main/job.vue"]]);
  const _imports_0$2 = "/static/tabbar/index1.svg";
  const _imports_1$1 = "/static/tabbar/index.svg";
  const _imports_2$2 = "/static/tabbar/study1.svg";
  const _imports_3$1 = "/static/tabbar/study.svg";
  const _imports_2$1 = "/static/tabbar/add.png";
  const _imports_5 = "/static/tabbar/forum1.svg";
  const _imports_6 = "/static/tabbar/forum.svg";
  const _imports_7 = "/static/tabbar/mine1.svg";
  const _imports_8 = "/static/tabbar/mine.svg";
  const _sfc_main$f = {
    components: {
      IndexPage: PagesMainIndex,
      StudyPage: PagesMainStudy,
      ForumPage: PagesMainForum,
      MinePage: PagesMainMine,
      JobPage: PagesMainJob
    },
    data() {
      return {
        currentPage: 1
      };
    },
    methods: {
      switchTab(i) {
        this.currentPage = i;
      }
    },
    mounted() {
      uni.$emit("reloadData");
    },
    beforeDestroy() {
      uni.closeSocket();
    },
    onReachBottom() {
      uni.$emit("onReachBottom" + this.currentPage);
    }
  };
  function _sfc_render$e(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_IndexPage = vue.resolveComponent("IndexPage");
    const _component_StudyPage = vue.resolveComponent("StudyPage");
    const _component_ForumPage = vue.resolveComponent("ForumPage");
    const _component_MinePage = vue.resolveComponent("MinePage");
    const _component_JobPage = vue.resolveComponent("JobPage");
    return vue.openBlock(), vue.createElementBlock(
      vue.Fragment,
      null,
      [
        vue.createElementVNode("view", { class: "content" }, [
          vue.withDirectives(vue.createVNode(
            _component_IndexPage,
            null,
            null,
            512
            /* NEED_PATCH */
          ), [
            [vue.vShow, $data.currentPage == 1]
          ]),
          vue.withDirectives(vue.createVNode(
            _component_StudyPage,
            null,
            null,
            512
            /* NEED_PATCH */
          ), [
            [vue.vShow, $data.currentPage == 2]
          ]),
          vue.withDirectives(vue.createVNode(
            _component_ForumPage,
            null,
            null,
            512
            /* NEED_PATCH */
          ), [
            [vue.vShow, $data.currentPage == 3]
          ]),
          vue.withDirectives(vue.createVNode(
            _component_MinePage,
            null,
            null,
            512
            /* NEED_PATCH */
          ), [
            [vue.vShow, $data.currentPage == 4]
          ]),
          vue.withDirectives(vue.createVNode(
            _component_JobPage,
            null,
            null,
            512
            /* NEED_PATCH */
          ), [
            [vue.vShow, $data.currentPage == 5]
          ])
        ]),
        vue.createElementVNode("view", { class: "tabbar" }, [
          vue.createElementVNode("view", {
            class: "item",
            onClick: _cache[0] || (_cache[0] = ($event) => $options.switchTab(1))
          }, [
            $data.currentPage == 1 ? (vue.openBlock(), vue.createElementBlock("image", {
              key: 0,
              src: _imports_0$2,
              mode: "scaleToFill"
            })) : (vue.openBlock(), vue.createElementBlock("image", {
              key: 1,
              src: _imports_1$1,
              mode: "scaleToFill"
            })),
            vue.createElementVNode("text", null, "首页")
          ]),
          vue.createElementVNode("view", {
            class: "item",
            onClick: _cache[1] || (_cache[1] = ($event) => $options.switchTab(2))
          }, [
            $data.currentPage == 2 ? (vue.openBlock(), vue.createElementBlock("image", {
              key: 0,
              src: _imports_2$2,
              mode: "scaleToFill"
            })) : (vue.openBlock(), vue.createElementBlock("image", {
              key: 1,
              src: _imports_3$1,
              mode: "scaleToFill"
            })),
            vue.createElementVNode("text", null, "学习")
          ]),
          vue.createElementVNode("view", {
            class: "item",
            onClick: _cache[2] || (_cache[2] = ($event) => $options.switchTab(5))
          }, [
            vue.createElementVNode("image", {
              id: "mid",
              src: _imports_2$1,
              mode: "scaleToFill"
            })
          ]),
          vue.createElementVNode("view", {
            class: "item",
            onClick: _cache[3] || (_cache[3] = ($event) => $options.switchTab(3))
          }, [
            $data.currentPage == 3 ? (vue.openBlock(), vue.createElementBlock("image", {
              key: 0,
              src: _imports_5,
              mode: "scaleToFill"
            })) : (vue.openBlock(), vue.createElementBlock("image", {
              key: 1,
              src: _imports_6,
              mode: "scaleToFill"
            })),
            vue.createElementVNode("text", null, "论坛")
          ]),
          vue.createElementVNode("view", {
            class: "item",
            onClick: _cache[4] || (_cache[4] = ($event) => $options.switchTab(4))
          }, [
            $data.currentPage == 4 ? (vue.openBlock(), vue.createElementBlock("image", {
              key: 0,
              src: _imports_7,
              mode: "scaleToFill"
            })) : (vue.openBlock(), vue.createElementBlock("image", {
              key: 1,
              src: _imports_8,
              mode: "scaleToFill"
            })),
            vue.createElementVNode("text", null, "个人")
          ])
        ]),
        vue.createElementVNode("view", { style: { "height": "80px" } })
      ],
      64
      /* STABLE_FRAGMENT */
    );
  }
  const PagesMainMain = /* @__PURE__ */ _export_sfc(_sfc_main$f, [["render", _sfc_render$e], ["__file", "E:/HBuilderX/Projects/职达/pages/main/main.vue"]]);
  const _sfc_main$e = {
    data() {
      return {
        avatar: "",
        avatarPath: "",
        nickname: ""
      };
    },
    methods: {
      chooseImage() {
        uni.chooseImage({
          count: 1,
          // 默认9，设置选择图片的数量
          sizeType: ["original", "compressed"],
          // 选择原图或压缩图
          sourceType: ["album"],
          // 从相册选择
          success: (res) => {
            this.avatarPath = res.tempFilePaths[0];
            plus.io.resolveLocalFileSystemURL(this.avatarPath, function(entry) {
              entry.file(function(file) {
                var reader = new plus.io.FileReader();
                reader.onloadend = function(e) {
                  var base64 = e.target.result;
                  formatAppLog("log", "at pages/edit-profile/edit-profile.vue:52", base64);
                  this.avatar = base64;
                };
                reader.readAsDataURL(file);
              }, function(e) {
                formatAppLog("log", "at pages/edit-profile/edit-profile.vue:57", "读取文件失败：" + e.message);
              });
            }, function(e) {
              formatAppLog("log", "at pages/edit-profile/edit-profile.vue:60", "解析文件路径失败：" + e.message);
            });
          },
          fail: (err) => {
            formatAppLog("error", "at pages/edit-profile/edit-profile.vue:65", "选择图片失败：", err);
          }
        });
      },
      confirmEdit() {
        uni.request({
          url: this.$url + "/user/updateUserInfo",
          method: "POST",
          header: {
            "token": uni.getStorageSync("token")
          },
          data: {
            "header": this.avatar,
            "nickname": this.nickname
          },
          success: (res) => {
            formatAppLog("log", "at pages/edit-profile/edit-profile.vue:82", res);
            uni.navigateTo({
              url: "/pages/main/main"
            });
          }
        });
      },
      cancelEdit() {
        uni.navigateBack();
      }
    }
  };
  function _sfc_render$d(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      vue.Fragment,
      null,
      [
        vue.createElementVNode("view", null, [
          vue.createElementVNode("view", { class: "avatar-box" }, [
            vue.createElementVNode("view", { class: "txt" }, " 头像 "),
            vue.createElementVNode("view", {
              class: "avatar",
              onClick: _cache[0] || (_cache[0] = ($event) => $options.chooseImage())
            }, [
              vue.createElementVNode("image", { src: $data.avatarPath }, null, 8, ["src"])
            ])
          ]),
          vue.createElementVNode("view", { class: "nickname-box" }, [
            vue.createElementVNode("view", { class: "txt" }, " 昵称 "),
            vue.createElementVNode("view", { class: "content" }, [
              vue.withDirectives(vue.createElementVNode(
                "input",
                {
                  "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $data.nickname = $event),
                  type: "text"
                },
                null,
                512
                /* NEED_PATCH */
              ), [
                [vue.vModelText, $data.nickname]
              ])
            ])
          ])
        ]),
        vue.createElementVNode("view", {
          class: "confirm-btn",
          onClick: _cache[2] || (_cache[2] = ($event) => $options.confirmEdit())
        }, " 确认 "),
        vue.createElementVNode("view", {
          class: "cancel-btn",
          onClick: _cache[3] || (_cache[3] = ($event) => $options.cancelEdit()())
        }, " 取消 ")
      ],
      64
      /* STABLE_FRAGMENT */
    );
  }
  const PagesEditProfileEditProfile = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["render", _sfc_render$d], ["__file", "E:/HBuilderX/Projects/职达/pages/edit-profile/edit-profile.vue"]]);
  const _sfc_main$d = {
    data() {
      return {
        avatar: "",
        nickname: ""
      };
    },
    methods: {
      chooseImage() {
        uni.chooseImage({
          count: 1,
          // 默认9，设置选择图片的数量
          sizeType: ["original", "compressed"],
          // 选择原图或压缩图
          sourceType: ["album"],
          // 从相册选择
          success: (res) => {
            uni.request({
              url: res.tempFilePaths,
              responseType: "arraybuffer",
              //最关键的参数，设置返回的数据格式为arraybuffer
              success: (res2) => {
                let base64 = wx.arrayBufferToBase64(res2.data);
                base64 = "data:image/jpeg;base64," + base64;
                formatAppLog("log", "at pages/create-group/create-group.vue:52", base64);
                this.avatar = base64;
              }
            });
          },
          fail: (err) => {
            formatAppLog("error", "at pages/create-group/create-group.vue:58", "选择图片失败：", err);
          }
        });
      },
      confirmCreate() {
        uni.request({
          url: this.$url + "/ws/createGroup",
          method: "POST",
          header: {
            "token": uni.getStorageSync("token")
          },
          data: {
            "groupAvatar": this.avatar,
            "groupName": this.nickname
          },
          success: (res) => {
            formatAppLog("log", "at pages/create-group/create-group.vue:75", res);
            uni.navigateTo({
              url: "/pages/main/main"
            });
          },
          fail: (res) => {
            uni.showToast({
              title: "仅管理员可创建群聊",
              icon: "none"
            });
          }
        });
      },
      cancelCreate() {
        uni.navigateBack();
      }
    }
  };
  function _sfc_render$c(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      vue.Fragment,
      null,
      [
        vue.createElementVNode("view", null, [
          vue.createElementVNode("view", { class: "avatar-box" }, [
            vue.createElementVNode("view", { class: "txt" }, " 群聊头像 "),
            vue.createElementVNode("view", {
              class: "avatar",
              onClick: _cache[0] || (_cache[0] = ($event) => $options.chooseImage())
            }, [
              vue.createElementVNode("image", { src: $data.avatar }, null, 8, ["src"])
            ])
          ]),
          vue.createElementVNode("view", { class: "nickname-box" }, [
            vue.createElementVNode("view", { class: "txt" }, " 群聊名称 "),
            vue.createElementVNode("view", { class: "content" }, [
              vue.withDirectives(vue.createElementVNode(
                "input",
                {
                  "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $data.nickname = $event),
                  type: "text"
                },
                null,
                512
                /* NEED_PATCH */
              ), [
                [vue.vModelText, $data.nickname]
              ])
            ])
          ])
        ]),
        vue.createElementVNode("view", {
          class: "confirm-btn",
          onClick: _cache[2] || (_cache[2] = ($event) => $options.confirmCreate())
        }, " 确认 "),
        vue.createElementVNode("view", {
          class: "cancel-btn",
          onClick: _cache[3] || (_cache[3] = ($event) => $options.cancelCreate())
        }, " 取消 ")
      ],
      64
      /* STABLE_FRAGMENT */
    );
  }
  const PagesCreateGroupCreateGroup = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["render", _sfc_render$c], ["__file", "E:/HBuilderX/Projects/职达/pages/create-group/create-group.vue"]]);
  const _sfc_main$c = {
    data() {
      return {
        content: "",
        imgList: [],
        base64List: []
      };
    },
    methods: {
      back() {
        uni.navigateBack();
      },
      onPublish() {
        uni.uploadFile({
          url: "http://47.97.7.86:8886/blog/publishBlog",
          files: this.imgList,
          formData: {
            "content": this.content,
            "public_status": 1
          },
          header: {
            "token": uni.getStorageSync("token")
          },
          success: (res) => {
            uni.$emit("reloadData");
            uni.navigateBack();
          },
          fail: (err) => {
            formatAppLog("log", "at pages/forum-subpage/publish-blog.vue:65", err);
          }
        });
      },
      chooseImage() {
        uni.chooseImage({
          count: 9,
          // 默认9，设置选择图片的数量  
          sizeType: ["original", "compressed"],
          // 可以指定是原图还是压缩图，默认二者都有  
          sourceType: ["album", "camera"],
          // 从相册选择  
          loop: true,
          success: (res) => {
            for (let i = 0; i < res.tempFilePaths.length; i++) {
              let suf = res.tempFilePaths[i].substring(res.tempFilePaths[i].lastIndexOf("."));
              let fileName = i + suf;
              this.imgList.push({
                name: fileName,
                uri: res.tempFilePaths[i]
              });
            }
            res.tempFilePaths.forEach((tempFilePath, index) => {
              this.base64List.push(tempFilePath);
            });
          },
          fail: (err) => {
            formatAppLog("error", "at pages/forum-subpage/publish-blog.vue:94", "选择图片失败：", err);
          }
        });
      }
    }
  };
  function _sfc_render$b(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", null, [
      vue.createElementVNode("view", { style: { "height": "20px", "background-color": "#eee" } }),
      vue.createElementVNode("view", { class: "box-1" }, [
        vue.createElementVNode("view", {
          class: "close-btn-box",
          onClick: _cache[0] || (_cache[0] = ($event) => $options.back())
        }, [
          vue.createElementVNode("view", { class: "close-btn" }, [
            vue.createElementVNode("image", {
              src: _imports_1$5,
              mode: "aspectFill"
            })
          ])
        ]),
        vue.createElementVNode("view", {
          class: "publish-btn-box",
          onClick: _cache[1] || (_cache[1] = ($event) => $options.onPublish())
        }, [
          vue.createElementVNode("view", { class: "publish-btn" }, [
            vue.createElementVNode("image", {
              src: _imports_0$4,
              mode: "aspectFill"
            })
          ]),
          vue.createElementVNode("view", { class: "publish-txt" }, " 发布 ")
        ])
      ]),
      vue.createElementVNode("view", { class: "content-box" }, [
        vue.createElementVNode("view", { class: "txt" }, [
          vue.withDirectives(vue.createElementVNode(
            "textarea",
            {
              "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $data.content = $event),
              placeholder: "这一刻想分享...",
              "auto-height": "true"
            },
            null,
            512
            /* NEED_PATCH */
          ), [
            [vue.vModelText, $data.content]
          ])
        ]),
        vue.createElementVNode("view", { class: "img" }, [
          (vue.openBlock(true), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList($data.base64List, (item, index) => {
              return vue.openBlock(), vue.createElementBlock("view", {
                class: "item",
                key: index
              }, [
                vue.createElementVNode("image", {
                  src: item,
                  mode: "aspectFill"
                }, null, 8, ["src"])
              ]);
            }),
            128
            /* KEYED_FRAGMENT */
          )),
          vue.createElementVNode("view", {
            class: "item",
            onClick: _cache[3] || (_cache[3] = ($event) => $options.chooseImage())
          }, [
            vue.createElementVNode("image", {
              src: _imports_2$1,
              mode: "aspectFill"
            })
          ])
        ])
      ])
    ]);
  }
  const PagesForumSubpagePublishBlog = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["render", _sfc_render$b], ["__file", "E:/HBuilderX/Projects/职达/pages/forum-subpage/publish-blog.vue"]]);
  const _sfc_main$b = {
    components: {
      TopNavBar
    },
    data() {
      return {
        blogData: "",
        commentContent: "",
        commentData: [],
        commentPage: 1
      };
    },
    methods: {
      clickLike(blog) {
        uni.request({
          url: this.$url + "/blog/likeBlog/" + blog.blogId,
          header: {
            "token": uni.getStorageSync("token")
          },
          success: (res) => {
            if (res.data.msg == "点赞成功") {
              blog.likes += 1;
              blog.isLike = true;
            } else {
              blog.likes -= 1;
              blog.isLike = false;
            }
          }
        });
      },
      publishComment() {
        if (this.commentContent == "") {
          uni.showToast({
            icon: "none",
            title: "评论不能为空"
          });
        } else {
          uni.request({
            url: this.$url + "/blog/publishComment",
            method: "POST",
            header: {
              "token": uni.getStorageSync("token")
            },
            data: {
              "content": this.commentContent,
              "blogId": uni.getStorageSync("blogId"),
              "parentCommentId": 0
            },
            success: (res) => {
              formatAppLog("log", "at pages/forum-subpage/blog.vue:132", res);
              this.commentContent = "";
              uni.showToast({
                icon: "none",
                title: "评论成功"
              });
              this.reloadData();
            }
          });
        }
      },
      loadBlogData() {
        uni.request({
          url: this.$url + "/blog/getBlog/" + uni.getStorageSync("blogId"),
          header: {
            "token": uni.getStorageSync("token")
          },
          success: (res) => {
            this.blogData = res.data.data;
            if (this.blogData.resources != null) {
              this.blogData.imgList = this.blogData.resources.split(",");
            }
            this.blogData.updateTime = this.blogData.updateTime.replace("T", " ");
            uni.request({
              url: this.$url + "/user/getHeader/" + this.blogData.username,
              header: {
                "token": uni.getStorageSync("token")
              },
              success: (res2) => {
                this.blogData.headerData = res2.data.data;
              }
            });
            uni.request({
              url: this.$url + "/blog/isLike/" + this.blogData.blogId,
              header: {
                "token": uni.getStorageSync("token")
              },
              success: (res2) => {
                this.blogData.isLike = res2.data.data;
              }
            });
          }
        });
      },
      loadMoreCommentData() {
        uni.request({
          url: this.$url + "/blog/getCommentList/" + uni.getStorageSync("blogId") + "/" + this.commentPage + "/10",
          header: {
            "token": uni.getStorageSync("token")
          },
          success: (res) => {
            res.data.data.records.forEach((item, index) => {
              uni.request({
                url: this.$url + "/user/getHeader/" + item.username,
                header: {
                  "token": uni.getStorageSync("token")
                },
                success: (res2) => {
                  item.headerData = res2.data.data;
                }
              });
              this.commentData.push(item);
            });
            this.commentPage += 1;
          }
        });
      },
      reloadData() {
        this.commentData = [];
        this.blogData = [];
        this.commentPage = 1;
        this.loadBlogData();
        this.loadMoreCommentData();
      }
    },
    mounted() {
      this.reloadData();
    },
    onReachBottom() {
      this.loadMoreCommentData();
    }
  };
  function _sfc_render$a(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_TopNavBar = vue.resolveComponent("TopNavBar");
    return vue.openBlock(), vue.createElementBlock("view", null, [
      vue.createVNode(_component_TopNavBar, {
        title: "",
        showBackBtn: "true"
      }),
      vue.createElementVNode("view", { class: "item" }, [
        vue.createElementVNode("view", { class: "top-box" }, [
          vue.createElementVNode("view", { class: "avatar-box" }, [
            vue.createElementVNode("image", {
              src: this.$url + "/file/getImage/" + $data.blogData.headerData,
              mode: "aspectFill"
            }, null, 8, ["src"])
          ]),
          vue.createElementVNode("view", { class: "box-2" }, [
            vue.createElementVNode(
              "view",
              { class: "name" },
              vue.toDisplayString($data.blogData.username),
              1
              /* TEXT */
            ),
            vue.createElementVNode(
              "view",
              { class: "time" },
              vue.toDisplayString($data.blogData.updateTime),
              1
              /* TEXT */
            )
          ])
        ]),
        vue.createElementVNode("view", { class: "main-box" }, [
          vue.createElementVNode("view", { class: "content-box" }, [
            vue.createElementVNode("view", { class: "img-box" }, [
              (vue.openBlock(true), vue.createElementBlock(
                vue.Fragment,
                null,
                vue.renderList($data.blogData.imgList, (img, i) => {
                  return vue.openBlock(), vue.createElementBlock("image", {
                    key: i,
                    src: this.$url + "/file/getImage/" + img,
                    mode: "aspectFill"
                  }, null, 8, ["src"]);
                }),
                128
                /* KEYED_FRAGMENT */
              ))
            ]),
            vue.createElementVNode(
              "view",
              { class: "txt" },
              vue.toDisplayString($data.blogData.content),
              1
              /* TEXT */
            )
          ]),
          vue.createElementVNode("view", { class: "location-box" }, " 四川大学江安校区 "),
          vue.createElementVNode("view", { class: "interaction-box" }, [
            vue.createElementVNode("view", { class: "share-btn" }, [
              vue.createElementVNode("image", { src: _imports_0$3 })
            ]),
            vue.createElementVNode("view", {
              class: "love-btn",
              onClick: _cache[0] || (_cache[0] = ($event) => $options.clickLike($data.blogData))
            }, [
              $data.blogData.isLike ? (vue.openBlock(), vue.createElementBlock("image", {
                key: 0,
                src: _imports_1$2
              })) : (vue.openBlock(), vue.createElementBlock("image", {
                key: 1,
                src: _imports_2$3
              })),
              vue.createElementVNode(
                "text",
                null,
                vue.toDisplayString($data.blogData.likes),
                1
                /* TEXT */
              )
            ]),
            vue.createElementVNode("view", { class: "message-btn" }, [
              vue.createElementVNode("image", { src: _imports_3$2 }),
              vue.createElementVNode(
                "text",
                null,
                vue.toDisplayString($data.blogData.reviews),
                1
                /* TEXT */
              )
            ])
          ])
        ])
      ]),
      vue.createElementVNode("view", { class: "comment-box" }, [
        (vue.openBlock(true), vue.createElementBlock(
          vue.Fragment,
          null,
          vue.renderList($data.commentData, (item, index) => {
            return vue.openBlock(), vue.createElementBlock("view", {
              key: index,
              class: "item"
            }, [
              vue.createElementVNode("view", { class: "avatar-box" }, [
                vue.createElementVNode("image", {
                  src: this.$url + "/file/getImage/" + item.headerData,
                  mode: "aspectFill"
                }, null, 8, ["src"])
              ]),
              vue.createElementVNode("view", { class: "box-2" }, [
                vue.createElementVNode(
                  "view",
                  { class: "name" },
                  vue.toDisplayString(item.username),
                  1
                  /* TEXT */
                ),
                vue.createElementVNode(
                  "view",
                  { class: "time" },
                  vue.toDisplayString(item.createTime.replace("T", " ")),
                  1
                  /* TEXT */
                ),
                vue.createElementVNode(
                  "view",
                  { class: "content" },
                  vue.toDisplayString(item.content),
                  1
                  /* TEXT */
                )
              ])
            ]);
          }),
          128
          /* KEYED_FRAGMENT */
        ))
      ]),
      vue.createElementVNode("view", { style: { "height": "100rpx", "bottom": "0" } }),
      vue.createElementVNode("view", { class: "publish-comment-box" }, [
        vue.createElementVNode("view", { class: "input-box" }, [
          vue.withDirectives(vue.createElementVNode(
            "input",
            {
              "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $data.commentContent = $event)
            },
            null,
            512
            /* NEED_PATCH */
          ), [
            [vue.vModelText, $data.commentContent]
          ])
        ]),
        vue.createElementVNode("view", {
          class: "publish-btn",
          onClick: _cache[2] || (_cache[2] = ($event) => $options.publishComment())
        }, " 发送 ")
      ])
    ]);
  }
  const PagesForumSubpageBlog = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["render", _sfc_render$a], ["__file", "E:/HBuilderX/Projects/职达/pages/forum-subpage/blog.vue"]]);
  const _sfc_main$a = {
    components: {
      TopNavBar,
      SearchBar
    },
    data() {
      return {
        currentSelection: 1,
        attentionPage: 1,
        fansPage: 1,
        attentionData: [],
        fansData: [],
        mineData: ""
      };
    },
    methods: {
      switchTab(i) {
        this.currentSelection = i;
      }
    },
    mounted() {
      uni.request({
        url: this.$url + "/blog/getMyInfo",
        header: {
          "token": uni.getStorageSync("token")
        },
        success: (res) => {
          this.mineData = res.data.data;
        }
      });
      uni.request({
        url: this.$url + "/blog/getAttentionList/" + this.attentionPage + "/20",
        header: {
          "token": uni.getStorageSync("token")
        },
        success: (res) => {
          this.attentionData = res.data.data;
        }
      });
      uni.request({
        url: this.$url + "/blog/getFansList/" + this.fansPage + "/20",
        header: {
          "token": uni.getStorageSync("token")
        },
        success: (res) => {
          this.fansData = res.data.data;
        }
      });
    }
  };
  function _sfc_render$9(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_TopNavBar = vue.resolveComponent("TopNavBar");
    const _component_SearchBar = vue.resolveComponent("SearchBar");
    return vue.openBlock(), vue.createElementBlock("view", null, [
      vue.createVNode(_component_TopNavBar, {
        title: "关注",
        showBackBtn: "true"
      }),
      vue.createVNode(_component_SearchBar),
      vue.createElementVNode("view", { class: "selection-tab-box" }, [
        vue.createElementVNode("view", {
          class: "selection-tab",
          onClick: _cache[0] || (_cache[0] = ($event) => $options.switchTab(1))
        }, [
          vue.createElementVNode(
            "view",
            { class: "num" },
            vue.toDisplayString($data.mineData.attention),
            1
            /* TEXT */
          ),
          vue.createElementVNode("view", { class: "txt" }, " 关注 "),
          $data.currentSelection == 1 ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 0,
            class: "selected-mark"
          })) : vue.createCommentVNode("v-if", true)
        ]),
        vue.createElementVNode("view", {
          class: "selection-tab",
          onClick: _cache[1] || (_cache[1] = ($event) => $options.switchTab(2))
        }, [
          vue.createElementVNode(
            "view",
            { class: "num" },
            vue.toDisplayString($data.mineData.fans),
            1
            /* TEXT */
          ),
          vue.createElementVNode("view", { class: "txt" }, " 粉丝 "),
          $data.currentSelection == 2 ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 0,
            class: "selected-mark"
          })) : vue.createCommentVNode("v-if", true)
        ])
      ]),
      $data.currentSelection == 1 ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 0,
        class: "selection"
      }, [
        vue.createElementVNode("view", { class: "list" }, [
          (vue.openBlock(true), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList($data.attentionData, (item, index) => {
              return vue.openBlock(), vue.createElementBlock("view", { class: "item" }, [
                vue.createElementVNode("view", { class: "avatar-box" }, [
                  vue.createElementVNode("image", {
                    class: "avatar",
                    src: _imports_0$7,
                    mode: "aspectFill"
                  })
                ]),
                vue.createElementVNode("view", { class: "txt-box" }, [
                  vue.createElementVNode(
                    "view",
                    { class: "nickname" },
                    vue.toDisplayString(item.username),
                    1
                    /* TEXT */
                  ),
                  vue.createElementVNode("view", { class: "info" }, " 123 ")
                ]),
                vue.createElementVNode("view", { class: "btn-box-1" }, " 已关注 ")
              ]);
            }),
            256
            /* UNKEYED_FRAGMENT */
          ))
        ])
      ])) : vue.createCommentVNode("v-if", true),
      $data.currentSelection == 2 ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 1,
        class: "selection"
      }, [
        vue.createElementVNode("view", { class: "list" }, [
          (vue.openBlock(true), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList($data.fansData, (item, index) => {
              return vue.openBlock(), vue.createElementBlock("view", { class: "item" }, [
                vue.createElementVNode("view", { class: "avatar-box" }, [
                  vue.createElementVNode("image", {
                    class: "avatar",
                    src: _imports_0$7,
                    mode: "aspectFill"
                  })
                ]),
                vue.createElementVNode("view", { class: "txt-box" }, [
                  vue.createElementVNode(
                    "view",
                    { class: "nickname" },
                    vue.toDisplayString(item.username),
                    1
                    /* TEXT */
                  ),
                  vue.createElementVNode("view", { class: "info" }, " 123 ")
                ]),
                vue.createElementVNode("view", { class: "btn-box-2" }, " 关注 ")
              ]);
            }),
            256
            /* UNKEYED_FRAGMENT */
          ))
        ])
      ])) : vue.createCommentVNode("v-if", true)
    ]);
  }
  const PagesForumSubpageRelationList = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["render", _sfc_render$9], ["__file", "E:/HBuilderX/Projects/职达/pages/forum-subpage/relation-list.vue"]]);
  const _imports_0$1 = "/static/testVideo.mp4";
  const _imports_3 = "/static/course/lock.svg";
  const _sfc_main$9 = {
    components: {
      TopNavBar
    },
    data() {
      return {
        currentSelection: 1,
        courseData: "",
        lessonData: []
      };
    },
    methods: {
      switchTab(i) {
        this.currentSelection = i;
      },
      toPay() {
        uni.navigateTo({
          url: "/pages/pay/pay"
        });
      }
    },
    mounted() {
      uni.request({
        url: this.$url + "/course/getCourseInfo/" + uni.getStorageSync("courseId"),
        header: {
          "token": uni.getStorageSync("token")
        },
        success: (res) => {
          formatAppLog("log", "at pages/course/course.vue:118", res);
          this.courseData = res.data.data;
        }
      });
      uni.request({
        url: this.$url + "/course/getCourseLessons/" + uni.getStorageSync("courseId"),
        header: {
          "token": uni.getStorageSync("token")
        },
        success: (res) => {
          formatAppLog("log", "at pages/course/course.vue:129", res);
          this.lessonData = res.data.data;
        }
      });
    }
  };
  function _sfc_render$8(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_TopNavBar = vue.resolveComponent("TopNavBar");
    return vue.openBlock(), vue.createElementBlock(
      vue.Fragment,
      null,
      [
        vue.createElementVNode("view", null, [
          vue.createVNode(_component_TopNavBar, {
            title: "课程",
            showBackBtn: "true"
          }),
          vue.createElementVNode("view", { class: "video-box" }, [
            vue.createElementVNode("video", {
              src: _imports_0$1,
              controls: "true"
            })
          ]),
          vue.createElementVNode("view", { class: "box-1" }, [
            vue.createElementVNode("view", { class: "box-1-1" }, [
              vue.createElementVNode(
                "view",
                { class: "title" },
                vue.toDisplayString($data.courseData.courseTitle),
                1
                /* TEXT */
              ),
              vue.createElementVNode(
                "view",
                { class: "cost" },
                " ￥" + vue.toDisplayString($data.courseData.price),
                1
                /* TEXT */
              )
            ]),
            vue.createElementVNode("view", { class: "box-1-2" }, [
              vue.createElementVNode("view", { class: "attribute-box" }, [
                vue.createElementVNode(
                  "view",
                  { class: "attribute" },
                  " 技能:" + vue.toDisplayString($data.courseData.skill),
                  1
                  /* TEXT */
                ),
                vue.createElementVNode(
                  "view",
                  { class: "attribute" },
                  " 财商:" + vue.toDisplayString($data.courseData.financial),
                  1
                  /* TEXT */
                ),
                vue.createElementVNode(
                  "view",
                  { class: "attribute" },
                  " 情商:" + vue.toDisplayString($data.courseData.emotional),
                  1
                  /* TEXT */
                )
              ]),
              vue.createElementVNode("view", { class: "add-box" }, [
                vue.createElementVNode("view", { class: "toggle-box" }, [
                  vue.createElementVNode("image", {
                    src: _imports_0$4,
                    mode: "aspectFill"
                  })
                ]),
                vue.createElementVNode("view", { class: "txt" }, " 添加至我的课程 ")
              ])
            ]),
            vue.createElementVNode("view", { class: "box-1-3" }, [
              vue.createElementVNode(
                "view",
                { class: "time" },
                vue.toDisplayString($data.courseData.updateTime.replace(new RegExp("T.*"), "")),
                1
                /* TEXT */
              ),
              vue.createElementVNode(
                "view",
                { class: "introduction" },
                vue.toDisplayString($data.courseData.des),
                1
                /* TEXT */
              ),
              vue.createElementVNode("view", { class: "buy-btn-box" }, [
                vue.createElementVNode("view", {
                  class: "buy-btn",
                  onClick: _cache[0] || (_cache[0] = ($event) => $options.toPay())
                }, [
                  vue.createElementVNode("text", null, "立即购买")
                ])
              ])
            ])
          ]),
          vue.createElementVNode("view", { class: "box-2" }, [
            vue.createElementVNode("view", { class: "selection-bar" }, [
              vue.createElementVNode("view", {
                class: "selection",
                onClick: _cache[1] || (_cache[1] = ($event) => $options.switchTab(1))
              }, [
                vue.createElementVNode("view", { class: "txt" }, " 合集 "),
                $data.currentSelection == 1 ? (vue.openBlock(), vue.createElementBlock("view", {
                  key: 0,
                  class: "selected-mark"
                })) : vue.createCommentVNode("v-if", true)
              ]),
              vue.createElementVNode("view", {
                class: "selection",
                onClick: _cache[2] || (_cache[2] = ($event) => $options.switchTab(2))
              }, [
                vue.createElementVNode("view", { class: "txt" }, " 更多 "),
                $data.currentSelection == 2 ? (vue.openBlock(), vue.createElementBlock("view", {
                  key: 0,
                  class: "selected-mark"
                })) : vue.createCommentVNode("v-if", true)
              ])
            ]),
            $data.currentSelection == 1 ? (vue.openBlock(), vue.createElementBlock("view", {
              key: 0,
              class: "selection-1"
            }, [
              vue.createElementVNode("view", { class: "lesson" }, [
                vue.createElementVNode("view", { class: "img" }, [
                  vue.createElementVNode("image", {
                    src: _imports_0$7,
                    mode: "aspectFill"
                  })
                ]),
                vue.createElementVNode("view", { class: "title" }, " 第一集 "),
                vue.createElementVNode("view", { class: "icon" }, [
                  vue.createElementVNode("image", {
                    src: _imports_3,
                    mode: "aspectFill"
                  })
                ])
              ])
            ])) : vue.createCommentVNode("v-if", true)
          ])
        ]),
        vue.createElementVNode("view", { style: { "height": "20px" } })
      ],
      64
      /* STABLE_FRAGMENT */
    );
  }
  const PagesCourseCourse = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["render", _sfc_render$8], ["__file", "E:/HBuilderX/Projects/职达/pages/course/course.vue"]]);
  const _imports_0 = "/static/course/pay1.svg";
  const _imports_1 = "/static/course/pay2.svg";
  const _imports_2 = "/static/course/pay3.svg";
  const _sfc_main$8 = {
    components: {
      TopNavBar
    },
    data() {
      return {
        courseData: "",
        paymentWay: 1
      };
    },
    methods: {
      switchPaymentWay(i) {
        this.paymentWay = i;
      },
      pay() {
      }
    },
    mounted() {
      uni.request({
        url: this.$url + "/course/getCourseInfo/" + uni.getStorageSync("courseId"),
        header: {
          "token": uni.getStorageSync("token")
        },
        success: (res) => {
          this.courseData = res.data.data;
        }
      });
    }
  };
  function _sfc_render$7(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_TopNavBar = vue.resolveComponent("TopNavBar");
    return vue.openBlock(), vue.createElementBlock("view", null, [
      vue.createVNode(_component_TopNavBar, {
        title: "支付",
        showBackBtn: "true"
      }),
      vue.createElementVNode(
        "view",
        { class: "num" },
        " ￥" + vue.toDisplayString($data.courseData.price),
        1
        /* TEXT */
      ),
      vue.createElementVNode("view", { class: "payment-way-box" }, [
        vue.createElementVNode("view", {
          class: "payment-way",
          onClick: _cache[0] || (_cache[0] = ($event) => $options.switchPaymentWay(1))
        }, [
          vue.createElementVNode("image", {
            src: _imports_0,
            mode: "scaleToFill"
          }),
          vue.createElementVNode("view", { class: "txt" }, " 微信支付 "),
          $data.paymentWay == 1 ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 0,
            class: "toggle-1"
          }, [
            vue.createElementVNode("view", { class: "toggle-1-selected" })
          ])) : (vue.openBlock(), vue.createElementBlock("view", {
            key: 1,
            class: "toggle-2"
          }))
        ]),
        vue.createElementVNode("view", {
          class: "payment-way",
          onClick: _cache[1] || (_cache[1] = ($event) => $options.switchPaymentWay(2))
        }, [
          vue.createElementVNode("image", {
            src: _imports_1,
            mode: "scaleToFill"
          }),
          vue.createElementVNode("view", { class: "txt" }, " 支付宝支付 "),
          $data.paymentWay == 2 ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 0,
            class: "toggle-1"
          }, [
            vue.createElementVNode("view", { class: "toggle-1-selected" })
          ])) : (vue.openBlock(), vue.createElementBlock("view", {
            key: 1,
            class: "toggle-2"
          }))
        ]),
        vue.createElementVNode("view", {
          class: "payment-way",
          onClick: _cache[2] || (_cache[2] = ($event) => $options.switchPaymentWay(3))
        }, [
          vue.createElementVNode("image", {
            src: _imports_2,
            mode: "scaleToFill"
          }),
          vue.createElementVNode("view", { class: "txt" }, " Apple Pay "),
          $data.paymentWay == 3 ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 0,
            class: "toggle-1"
          }, [
            vue.createElementVNode("view", { class: "toggle-1-selected" })
          ])) : (vue.openBlock(), vue.createElementBlock("view", {
            key: 1,
            class: "toggle-2"
          }))
        ])
      ]),
      vue.createElementVNode("view", { class: "buy-btn-box" }, [
        vue.createElementVNode("view", {
          class: "buy-btn",
          onClick: _cache[3] || (_cache[3] = ($event) => $options.pay())
        }, [
          vue.createElementVNode("text", null, "支付")
        ])
      ])
    ]);
  }
  const PagesPayPay = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["render", _sfc_render$7], ["__file", "E:/HBuilderX/Projects/职达/pages/pay/pay.vue"]]);
  const _sfc_main$7 = {
    components: {
      TopNavBar
    },
    data() {
      return {
        jobData: ""
      };
    },
    methods: {
      toJobApply() {
        uni.navigateTo({
          url: "/pages/job-subpage/job-apply"
        });
      }
    },
    mounted() {
      uni.request({
        url: this.$url + "/job/getJobInfo/" + uni.getStorageSync("jobId"),
        header: {
          "token": uni.getStorageSync("token")
        },
        success: (res) => {
          this.jobData = res.data.data;
        }
      });
    }
  };
  function _sfc_render$6(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_TopNavBar = vue.resolveComponent("TopNavBar");
    return vue.openBlock(), vue.createElementBlock("view", null, [
      vue.createVNode(_component_TopNavBar, {
        title: "",
        showBackBtn: "true"
      }),
      vue.createElementVNode("view", { style: { "margin": "0 40rpx" } }, [
        vue.createElementVNode("view", { class: "top-box" }, [
          vue.createElementVNode(
            "view",
            { class: "title" },
            vue.toDisplayString($data.jobData.jobName),
            1
            /* TEXT */
          ),
          vue.createElementVNode(
            "view",
            { class: "company" },
            vue.toDisplayString($data.jobData.companyName),
            1
            /* TEXT */
          ),
          vue.createElementVNode(
            "view",
            { class: "location" },
            vue.toDisplayString($data.jobData.companyLocation),
            1
            /* TEXT */
          )
        ]),
        vue.createElementVNode("view", { class: "content-title" }, " 岗位描述 "),
        vue.createElementVNode(
          "view",
          { class: "content" },
          vue.toDisplayString($data.jobData.jobDes),
          1
          /* TEXT */
        ),
        vue.createElementVNode("view", { class: "content-title" }, " 岗位要求 "),
        vue.createElementVNode(
          "view",
          { class: "content" },
          vue.toDisplayString($data.jobData.jobRequire),
          1
          /* TEXT */
        ),
        vue.createElementVNode("view", { class: "company-box" }, [
          vue.createElementVNode("image", {
            src: _imports_0$7,
            mode: "aspectFill"
          }),
          vue.createElementVNode("view", { class: "txt" }, [
            vue.createElementVNode(
              "view",
              { class: "name" },
              vue.toDisplayString($data.jobData.companyName),
              1
              /* TEXT */
            ),
            vue.createElementVNode("view", { class: "description" }, " 1000-9999人互联网 ")
          ])
        ]),
        vue.createElementVNode("view", { class: "apply-btn-box" }, [
          vue.createElementVNode("view", {
            class: "apply-btn",
            onClick: _cache[0] || (_cache[0] = ($event) => $options.toJobApply())
          }, [
            vue.createElementVNode("text", null, "立即网申")
          ])
        ])
      ])
    ]);
  }
  const PagesJobSubpageJobDetail = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["render", _sfc_render$6], ["__file", "E:/HBuilderX/Projects/职达/pages/job-subpage/job-detail.vue"]]);
  const _sfc_main$6 = {
    components: {
      TopNavBar
    },
    data() {
      return {
        name: "",
        school_name: "",
        educational: "",
        major: "",
        phone: "",
        email: "",
        sex: 1,
        sexOption: [{ name: "男" }, { name: "女" }]
      };
    },
    methods: {
      bindPickerChange: function(e) {
        this.sex = e.detail.value;
      },
      onApply() {
        if (this.name == "" || this.school_name == "" || this.educational == "" || this.major == "" || this.phone == "" || this.email == "") {
          uni.showToast({
            title: "内容不能为空",
            icon: "none"
          });
        } else {
          uni.request({
            url: this.$url + "/job/submitJob",
            header: {
              "token": uni.getStorageSync("token")
            },
            method: "POST",
            data: {
              "job_id": uni.getStorageSync("jobId"),
              "name": this.name,
              "school_name": this.school_name,
              "educational": this.educational,
              "major": this.major,
              "phone": this.phone,
              "email": this.email,
              "sex": this.sex + 1
            },
            success: (res) => {
              uni.navigateTo({
                url: "/pages/job-subpage/job-apply-success",
                animationType: "none"
              });
            }
          });
        }
      }
    }
  };
  function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_TopNavBar = vue.resolveComponent("TopNavBar");
    return vue.openBlock(), vue.createElementBlock("view", null, [
      vue.createVNode(_component_TopNavBar, {
        title: "",
        showBackBtn: "true"
      }),
      vue.createElementVNode("view", { style: { "margin": "0 20px" } }, [
        vue.createElementVNode("view", { style: { "font-size": "18px", "font-weight": "bold" } }, "填写报名信息"),
        vue.createElementVNode("view", { class: "title" }, " 姓名 "),
        vue.createElementVNode("view", { class: "input-box" }, [
          vue.withDirectives(vue.createElementVNode(
            "input",
            {
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.name = $event)
            },
            null,
            512
            /* NEED_PATCH */
          ), [
            [vue.vModelText, $data.name]
          ])
        ]),
        vue.createElementVNode("view", { class: "title" }, " 学校 "),
        vue.createElementVNode("view", { class: "input-box" }, [
          vue.withDirectives(vue.createElementVNode(
            "input",
            {
              "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $data.school_name = $event)
            },
            null,
            512
            /* NEED_PATCH */
          ), [
            [vue.vModelText, $data.school_name]
          ])
        ]),
        vue.createElementVNode("view", { class: "title" }, " 最高学历 "),
        vue.createElementVNode("view", { class: "input-box" }, [
          vue.withDirectives(vue.createElementVNode(
            "input",
            {
              "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $data.educational = $event)
            },
            null,
            512
            /* NEED_PATCH */
          ), [
            [vue.vModelText, $data.educational]
          ])
        ]),
        vue.createElementVNode("view", { class: "title" }, " 专业 "),
        vue.createElementVNode("view", { class: "input-box" }, [
          vue.withDirectives(vue.createElementVNode(
            "input",
            {
              "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => $data.major = $event)
            },
            null,
            512
            /* NEED_PATCH */
          ), [
            [vue.vModelText, $data.major]
          ])
        ]),
        vue.createElementVNode("view", { class: "title" }, " 联系电话 "),
        vue.createElementVNode("view", { class: "input-box" }, [
          vue.withDirectives(vue.createElementVNode(
            "input",
            {
              "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => $data.phone = $event),
              type: "number"
            },
            null,
            512
            /* NEED_PATCH */
          ), [
            [vue.vModelText, $data.phone]
          ])
        ]),
        vue.createElementVNode("view", { class: "title" }, " 性别 "),
        vue.createElementVNode("view", { class: "input-box" }, [
          vue.createElementVNode("picker", {
            onChange: _cache[5] || (_cache[5] = (...args) => $options.bindPickerChange && $options.bindPickerChange(...args)),
            value: $data.sex,
            range: $data.sexOption,
            "range-key": "name"
          }, [
            vue.createElementVNode(
              "view",
              null,
              vue.toDisplayString($data.sexOption[$data.sex].name),
              1
              /* TEXT */
            )
          ], 40, ["value", "range"])
        ]),
        vue.createElementVNode("view", { class: "title" }, " 邮箱 "),
        vue.createElementVNode("view", { class: "input-box" }, [
          vue.withDirectives(vue.createElementVNode(
            "input",
            {
              "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => $data.email = $event)
            },
            null,
            512
            /* NEED_PATCH */
          ), [
            [vue.vModelText, $data.email]
          ])
        ]),
        vue.createElementVNode("view", { class: "apply-btn-box" }, [
          vue.createElementVNode("view", {
            class: "apply-btn",
            onClick: _cache[7] || (_cache[7] = ($event) => $options.onApply())
          }, [
            vue.createElementVNode("text", null, "提交")
          ])
        ])
      ])
    ]);
  }
  const PagesJobSubpageJobApply = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["render", _sfc_render$5], ["__file", "E:/HBuilderX/Projects/职达/pages/job-subpage/job-apply.vue"]]);
  const _sfc_main$5 = {
    data() {
      return {};
    },
    methods: {
      back() {
        uni.navigateBack();
      }
    }
  };
  function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { style: { "width": "100%", "height": "100%" } }, [
      vue.createElementVNode("view", { style: { "width": "100%", "height": "100%", "display": "flex", "flex-direction": "column", "align-items": "center", "justify-content": "center" } }, [
        vue.createElementVNode("view", { class: "success-btn-box" }, [
          vue.createElementVNode("view", { class: "success-btn" }, [
            vue.createElementVNode("image", {
              src: _imports_0$4,
              mode: "aspectFill"
            })
          ])
        ]),
        vue.createElementVNode("view", { style: { "font-size": "26px", "font-weight": "bold" } }, " 提交成功 "),
        vue.createElementVNode("view", { style: { "font-size": "14px", "margin-top": "10px" } }, " HR会尽快查看您的信息，请耐心等待 "),
        vue.createElementVNode("view", {
          style: { "font-size": "14px", "margin-top": "20px", "color": "#ff6a39" },
          onClick: _cache[0] || (_cache[0] = ($event) => $options.back())
        }, " 返回 ")
      ])
    ]);
  }
  const PagesJobSubpageJobApplySuccess = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["render", _sfc_render$4], ["__file", "E:/HBuilderX/Projects/职达/pages/job-subpage/job-apply-success.vue"]]);
  const _sfc_main$4 = {
    components: {
      TopNavBar
    },
    data() {
      return {};
    },
    methods: {}
  };
  function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_TopNavBar = vue.resolveComponent("TopNavBar");
    return vue.openBlock(), vue.createElementBlock("view", null, [
      vue.createVNode(_component_TopNavBar, {
        title: "",
        showBackBtn: "true"
      }),
      vue.createElementVNode("view", { style: { "margin": "0 20px" } }, [
        vue.createElementVNode("view", { style: { "font-size": "18px", "font-weight": "bold" } }, "填写岗位招聘信息"),
        vue.createElementVNode("view", { class: "title" }, " 岗位名称 "),
        vue.createElementVNode("view", { class: "input-box" }, [
          vue.createElementVNode("input")
        ]),
        vue.createElementVNode("view", { class: "title" }, " 工作地址 "),
        vue.createElementVNode("view", { class: "input-box" }, [
          vue.createElementVNode("input")
        ]),
        vue.createElementVNode("view", { class: "title" }, " 最低学历 "),
        vue.createElementVNode("view", { class: "input-box" }, [
          vue.createElementVNode("input")
        ]),
        vue.createElementVNode("view", { class: "title" }, " 岗位描述 "),
        vue.createElementVNode("view", { class: "input-box" }, [
          vue.createElementVNode("input")
        ]),
        vue.createElementVNode("view", { class: "title" }, " 岗位要求 "),
        vue.createElementVNode("view", { class: "input-box" }, [
          vue.createElementVNode("input")
        ]),
        vue.createElementVNode("view", { class: "title" }, " 薪资范围 "),
        vue.createElementVNode("view", { class: "input-box-2" }, [
          vue.createElementVNode("view", { class: "input-box" }, [
            vue.createElementVNode("input", { type: "number" })
          ]),
          vue.createElementVNode("view", { class: "line" }),
          vue.createElementVNode("view", { class: "input-box" }, [
            vue.createElementVNode("input", { type: "number" })
          ])
        ]),
        vue.createElementVNode("view", { class: "publish-btn-box" }, [
          vue.createElementVNode("view", {
            class: "publish-btn",
            onClick: _cache[0] || (_cache[0] = ($event) => _ctx.onPublish())
          }, [
            vue.createElementVNode("text", null, "立即发布")
          ])
        ])
      ])
    ]);
  }
  const PagesJobSubpageJobPublish = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$3], ["__file", "E:/HBuilderX/Projects/职达/pages/job-subpage/job-publish.vue"]]);
  const _sfc_main$3 = {
    data() {
      return {};
    },
    methods: {
      toJobPublish() {
        uni.navigateTo({
          url: "/pages/job-subpage/job-publish"
        });
      },
      toJobCheckApplication() {
        uni.navigateTo({
          url: "/pages/job-subpage/job-check-application"
        });
      },
      toJobManage() {
        uni.navigateTo({
          url: "/pages/job-subpage/job-manage"
        });
      }
    }
  };
  function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "page-box" }, [
      vue.createElementVNode("view", { class: "title" }, " 发布招聘岗位 "),
      vue.createElementVNode("view", {
        class: "option-box",
        onClick: _cache[0] || (_cache[0] = ($event) => $options.toJobPublish())
      }, [
        vue.createElementVNode("view", { class: "icon-box" }, [
          vue.createElementVNode("image", {
            src: _imports_0$4,
            mode: "aspectFill"
          })
        ]),
        vue.createElementVNode("view", { class: "name" }, " 全职招聘 "),
        vue.createElementVNode("view", { class: "enter-box" }, [
          vue.createElementVNode("image", {
            src: _imports_1$5,
            mode: "aspectFill"
          })
        ])
      ]),
      vue.createElementVNode("view", {
        class: "option-box",
        onClick: _cache[1] || (_cache[1] = ($event) => $options.toJobPublish())
      }, [
        vue.createElementVNode("view", { class: "icon-box" }, [
          vue.createElementVNode("image", {
            src: _imports_0$4,
            mode: "aspectFill"
          })
        ]),
        vue.createElementVNode("view", { class: "name" }, " 实习招聘 "),
        vue.createElementVNode("view", { class: "enter-box" }, [
          vue.createElementVNode("image", {
            src: _imports_1$5,
            mode: "aspectFill"
          })
        ])
      ]),
      vue.createElementVNode("view", {
        class: "option-box",
        onClick: _cache[2] || (_cache[2] = ($event) => $options.toJobPublish())
      }, [
        vue.createElementVNode("view", { class: "icon-box" }, [
          vue.createElementVNode("image", {
            src: _imports_0$4,
            mode: "aspectFill"
          })
        ]),
        vue.createElementVNode("view", { class: "name" }, " 兼职招聘 "),
        vue.createElementVNode("view", { class: "enter-box" }, [
          vue.createElementVNode("image", {
            src: _imports_1$5,
            mode: "aspectFill"
          })
        ])
      ]),
      vue.createElementVNode("view", { class: "title" }, " 管理招聘岗位 "),
      vue.createElementVNode("view", {
        class: "option-box",
        onClick: _cache[3] || (_cache[3] = ($event) => $options.toJobCheckApplication())
      }, [
        vue.createElementVNode("view", { class: "icon-box" }, [
          vue.createElementVNode("image", {
            src: _imports_0$4,
            mode: "aspectFill"
          })
        ]),
        vue.createElementVNode("view", { class: "name" }, " 查看投递信息 "),
        vue.createElementVNode("view", { class: "enter-box" }, [
          vue.createElementVNode("image", {
            src: _imports_1$5,
            mode: "aspectFill"
          })
        ])
      ]),
      vue.createElementVNode("view", {
        class: "option-box",
        onClick: _cache[4] || (_cache[4] = ($event) => $options.toJobManage())
      }, [
        vue.createElementVNode("view", { class: "icon-box" }, [
          vue.createElementVNode("image", {
            src: _imports_0$4,
            mode: "aspectFill"
          })
        ]),
        vue.createElementVNode("view", { class: "name" }, " 管理招聘发布信息 "),
        vue.createElementVNode("view", { class: "enter-box" }, [
          vue.createElementVNode("image", {
            src: _imports_1$5,
            mode: "aspectFill"
          })
        ])
      ])
    ]);
  }
  const PagesJobSubpageJobEnterprise = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$2], ["__file", "E:/HBuilderX/Projects/职达/pages/job-subpage/job-enterprise.vue"]]);
  const _sfc_main$2 = {
    components: {
      TopNavBar
    },
    data() {
      return {};
    },
    methods: {}
  };
  function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_TopNavBar = vue.resolveComponent("TopNavBar");
    return vue.openBlock(), vue.createElementBlock("view", null, [
      vue.createVNode(_component_TopNavBar, {
        title: "查看投递信息",
        showBackBtn: "true"
      }),
      vue.createElementVNode("view", { class: "item-box" }, [
        vue.createElementVNode("view", { class: "left-box" }, [
          vue.createElementVNode("view", { class: "box-1" }, [
            vue.createElementVNode("view", { class: "name" }, " XXX "),
            vue.createElementVNode("view", { class: "sex" }, " 男 ")
          ]),
          vue.createElementVNode("view", { class: "box-2" }, [
            vue.createElementVNode("view", { class: "info" }, " 四川大学 "),
            vue.createElementVNode("view", { class: "info" }, " 本科 "),
            vue.createElementVNode("view", { class: "info" }, " 软件工程 ")
          ]),
          vue.createElementVNode("view", { class: "time-box" }, [
            vue.createElementVNode("view", { class: "time" }, " 2024-09-05 ")
          ])
        ]),
        vue.createElementVNode("view", { class: "right-box" }, [
          vue.createElementVNode("view", { class: "btn" }, " 私聊 "),
          vue.createElementVNode("view", { class: "btn" }, " 招聘 "),
          vue.createElementVNode("view", { class: "txt" }, " 下载简历 ")
        ])
      ])
    ]);
  }
  const PagesJobSubpageJobCheckApplication = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$1], ["__file", "E:/HBuilderX/Projects/职达/pages/job-subpage/job-check-application.vue"]]);
  const _sfc_main$1 = {
    components: {
      TopNavBar
    },
    data() {
      return {};
    },
    methods: {}
  };
  function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_TopNavBar = vue.resolveComponent("TopNavBar");
    return vue.openBlock(), vue.createElementBlock("view", null, [
      vue.createVNode(_component_TopNavBar, {
        title: "管理招聘发布信息",
        showBackBtn: "true"
      }),
      vue.createElementVNode("view", { class: "item-box" }, [
        vue.createElementVNode("view", { class: "left-box" }, [
          vue.createElementVNode("view", { class: "box-1" }, [
            vue.createElementVNode("view", { class: "name" }, " 前端研发工程师 ")
          ]),
          vue.createElementVNode("view", { class: "box-2" }, [
            vue.createElementVNode("view", { class: "info" }, " 全职 "),
            vue.createElementVNode("view", { class: "info" }, " 成都 "),
            vue.createElementVNode("view", { class: "info" }, " 本科 ")
          ]),
          vue.createElementVNode("view", { class: "time-box" }, [
            vue.createElementVNode("view", { class: "time" }, " 2024-09-05 ")
          ])
        ]),
        vue.createElementVNode("view", { class: "right-box" }, [
          vue.createElementVNode("view", { class: "btn" }, " 编辑信息 "),
          vue.createElementVNode("view", { class: "txt" }, " 删除 ")
        ])
      ])
    ]);
  }
  const PagesJobSubpageJobManage = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render], ["__file", "E:/HBuilderX/Projects/职达/pages/job-subpage/job-manage.vue"]]);
  __definePage("pages/account/login", PagesAccountLogin);
  __definePage("pages/main/index", PagesMainIndex);
  __definePage("pages/main/study", PagesMainStudy);
  __definePage("pages/chat/chat", PagesChatChat);
  __definePage("pages/main/mine", PagesMainMine);
  __definePage("pages/chat/dialog", PagesChatDialog);
  __definePage("pages/account/signup", PagesAccountSignup);
  __definePage("pages/account/forgetpwd", PagesAccountForgetpwd);
  __definePage("pages/main/forum", PagesMainForum);
  __definePage("pages/main/main", PagesMainMain);
  __definePage("pages/edit-profile/edit-profile", PagesEditProfileEditProfile);
  __definePage("pages/create-group/create-group", PagesCreateGroupCreateGroup);
  __definePage("pages/forum-subpage/publish-blog", PagesForumSubpagePublishBlog);
  __definePage("pages/forum-subpage/blog", PagesForumSubpageBlog);
  __definePage("pages/forum-subpage/relation-list", PagesForumSubpageRelationList);
  __definePage("pages/course/course", PagesCourseCourse);
  __definePage("pages/pay/pay", PagesPayPay);
  __definePage("pages/main/job", PagesMainJob);
  __definePage("pages/job-subpage/job-detail", PagesJobSubpageJobDetail);
  __definePage("pages/job-subpage/job-apply", PagesJobSubpageJobApply);
  __definePage("pages/job-subpage/job-apply-success", PagesJobSubpageJobApplySuccess);
  __definePage("pages/job-subpage/job-publish", PagesJobSubpageJobPublish);
  __definePage("pages/job-subpage/job-enterprise", PagesJobSubpageJobEnterprise);
  __definePage("pages/job-subpage/job-check-application", PagesJobSubpageJobCheckApplication);
  __definePage("pages/job-subpage/job-manage", PagesJobSubpageJobManage);
  const _sfc_main = {
    globalData: {
      group_id: ""
    },
    onLaunch: function() {
      formatAppLog("log", "at App.vue:7", "App Launch");
    },
    onShow: function() {
      formatAppLog("log", "at App.vue:10", "App Show");
    },
    onHide: function() {
      formatAppLog("log", "at App.vue:13", "App Hide");
    }
  };
  const App = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "E:/HBuilderX/Projects/职达/App.vue"]]);
  function createApp() {
    const app = vue.createVueApp(App);
    app.config.globalProperties.$url = "http://47.97.7.86:8886";
    app.config.globalProperties.$wsurl = "http://47.97.7.86:8887";
    return {
      app
    };
  }
  const { app: __app__, Vuex: __Vuex__, Pinia: __Pinia__ } = createApp();
  uni.Vuex = __Vuex__;
  uni.Pinia = __Pinia__;
  __app__.provide("__globalStyles", __uniConfig.styles);
  __app__._component.mpType = "app";
  __app__._component.render = () => {
  };
  __app__.mount("#app");
})(Vue);
