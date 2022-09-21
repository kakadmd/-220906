/**
 * 将file对象转成base64
 */
export function resolveToBase64(file) {
  return new Promise((resolve) => {
    const fr = new FileReader()
    fr.readAsDataURL(file)
    fr.onload = (e) => {
      // console.log(e.target.result)
      resolve(e.target.result)
    }
  })
}
