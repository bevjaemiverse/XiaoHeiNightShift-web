# 小黑天天上夜班宣传网站

游戏官网与轻量试玩体验。页面基于 React、TypeScript、Vite 和 Motion。

## 本地运行

```powershell
npm.cmd install
npm.cmd run dev
```

## 构建

```powershell
npm.cmd run build
```

## 上线前必须补充

仓库目前没有官方微信小游戏码。请把可发布的小游戏码保存为：

```text
public/wechat-mini-game-code.png
```

页面会自动显示这个文件，无需再改代码。不要使用普通二维码冒充小游戏码。

## 素材来源

- `public/assets/hero-night-repair.png`：为官网生成的 Ian 小黑风格横版主视觉。
- `xiaohei-home.png`、`starport-mall-v2.png`、`day-shift-photo.png`：来自游戏当前 Cocos 代码实际引用的资源。
- 未使用旧版 `starport-mall.png` 和 `art-source/unused/` 下的素材。
