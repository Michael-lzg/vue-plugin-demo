const UploadImg = {
  imageHandle (files, maxSize, imgDom) {
    const that = this
    const formdata = new FormData()
    const reader = new FileReader()
    reader.readAsDataURL(files[0]) // 将图片转成base64格式
    // reader.onload是异步，要用到Promise对象将值返回出去
    return new Promise((resolve, reject) => {
      reader.onload = function () {
        const result = this.result
        let img = new Image()
        img.src = result
        if (this.result.length <= maxSize) {
          imgDom.src = result
          img = null
          formdata.append('image', that._upload(result, files[0].name, files[0].type))
          resolve(formdata)
        } else {
          img.onload = function () {
            const data = that._compress(img)
            imgDom.src = data
            formdata.append('image', that._upload(data, files[0].name, files[0].type))
            resolve(formdata)
          }
        }
      }
    })
  },
  _compress (img) {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    // 瓦片
    const tCanvas = document.createElement('canvas')
    const tctx = tCanvas.getContext('2d')
    let width = img.width
    let height = img.height
    // 如果图片大于四百万像素，计算压缩比并将大小压至400万以下
    let ratio
    if ((ratio = (width * height) / 4000000) > 1) {
      ratio = Math.sqrt(ratio)
      width /= ratio
      height /= ratio
    } else {
      ratio = 1
    }
    canvas.width = width
    canvas.height = height
    // 铺底色
    ctx.fillStyle = '#fff'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    // 如果图片像素大于100万则使用瓦片绘制
    let count
    if ((count = (width * height) / 1000000) > 1) {
      count = ~~(Math.sqrt(count) + 1) // 计算要分成多少瓦片
      // 计算每块瓦片的宽高
      const nw = ~~(width / count)
      const nh = ~~(height / count)
      tCanvas.width = nw
      tCanvas.height = nh
      for (let i = 0; i < count; i++) {
        for (let j = 0; j < count; j++) {
          tctx.drawImage(img, i * nw * ratio, j * nh * ratio, nw * ratio, nh * ratio, 0, 0, nw, nh)
          ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh)
        }
      }
    } else {
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
    }
    // 进行最小压缩
    const ndata = canvas.toDataURL('image/jpeg', 0.3)
    tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0
    return ndata
  },
  _upload (data, name, type) {
    const text = window.atob(data.split(',')[1])
    const buffer = new ArrayBuffer(text.length)
    const ubuffer = new Uint8Array(buffer)

    for (var i = 0; i < text.length; i++) {
      ubuffer[i] = text.charCodeAt(i)
    }

    const Builder =
      window.BlobBuilder ||
      window.WebKitBlobBuilder ||
      window.MozBlobBuilder ||
      window.MSBlobBuilder
    let blob
    if (Builder) {
      var builder = new Builder()
      builder.append(buffer)
      blob = builder.getBlob(type)
    } else {
      blob = new window.Blob([ubuffer], { type: type })
    }
    // blob 转file
    var fileOfBlob = new File([blob], name, { type: type })
    return fileOfBlob
  }
}

export default UploadImg
