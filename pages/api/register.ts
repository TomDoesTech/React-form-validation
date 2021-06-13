// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default (req, res) => {
  console.log("GIT THE REQUEST:", JSON.stringify(req.body));

  res.send(200);
};
