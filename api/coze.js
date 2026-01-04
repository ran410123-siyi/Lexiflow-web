export default async function handler(req, res) {
  res.status(200).json({
    ok: true,
    message: 'api/coze is working'
  })
}
