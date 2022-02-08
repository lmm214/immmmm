---
title: "撸个 Alfred 插件「b言b语」"
date: 2020-05-01T11:15:30+0800
tags: [折腾]
---

![bb-1](https://pic.edui.fun/images/2020/05/bb-1.png)

虽说 iOS 的快捷方式足够优雅，但还是想着 Mac 上也更舒坦地随意发布。VSCode 的 [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) 插件能用但没有一键直达，看到 [@xwlearn](https://xwlearn.com/howto-graciously-bb-in-mac/) 分享的 Python 代码，立马想到神器 「Alfred」！

### 插件撸起

![bb-3](https://pic.edui.fun/images/2020/05/bb-3.png)

安装依赖：

```
sudo pip install urllib3
```

<!--more-->

下载插件 [「bb.alfredworkflow」](https://immmmm.com/share/bb.alfredworkflow)，修改其中的 `X-LC-Id` `X-LC-Key` 和 `url`：

```python
#!/usr/local/bin/python3
# _*_ coding: utf-8 _*_
import sys
import urllib3
import json
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)
data = {"content": "{{query}}"}
headers = {
    'Content-Type': 'application/json',
    'X-LC-Id': '',   # 填入AppID
    'X-LC-Key': ',master' # 逗号前填入masterKey
}
url = 'https://AppID前八位.api.lncldglobal.com/1.1/classes/content' # 国际版是前8位
http = urllib3.PoolManager(timeout = 3)
r = http.request('POST', url, body=json.dumps(data), headers = headers)
if str(r.status) == "201":
    print('success!')
    print(json.loads(r.data.decode('utf-8')))
else:
    print('something is wrong!')
```

### 题外话

五一快乐，动起来！

🧹