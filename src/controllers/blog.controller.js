const Blog = require("../models/blog.model");

const getAll = async (req, res) => {
  try {
    const [posts] = await Blog.getAllPost();
    res.json(posts);
  } catch (error) {
    res.json({ fatal: error.message });
  }
};

const getById = async (req, res) => {
  try {
    const [post] = await Blog.postByid(req.params.id_post);
    console.log(post);
    if (posts.length === 0) {
      return res.json({ fatal: "no existe ese post" });
    }
    res.json(post[0]);
    res.json(result);
  } catch (error) {
    res.json({ fatal: error.message });
  }
};

const getByCategory = async (req, res) => {
  try {
    const [posts] = await Blog.postByCategory(req.params.categoria); //revisar req.params
    console.log(posts);
    if (posts.length === 0) {
      return res.json({ fatal: "no existen post en esa categoria" });
    }
    res.json(posts[0]);
    res.json(result);
  } catch (error) {
    res.json({ fatal: error.message });
  }
};

const remove = async (req, res) => {
  try {
    const { id_post } = req.params;
    const [result] = await Blog.deleteById(id_post);

    res.json(result);
  } catch (error) {
    res.json({ fatal: error.message });
  }
};

const update = async (req, res) => {
  try {
    const { id_post } = req.params;
    req.body.usuario_id = req.user.id
    const [result] = await Blog.updateById(+id_post, req.body);

    const [posts] = await Blog.postById(+id_post);

    // res.json({ reservas, result });
    res.json(posts);
    // res.json(result);
  } catch (error) {
    res.json({ fatal: error.message });
  }
};

const create = async (req, res) => {
  try {
    req.body.usuario_id = req.user.id;
    const [result] = await Blog.createPost(req.body);
    console.log(result);
    const [posts] = await Blog.postById(result.insertId);
//TODO REVISAR  insertId
    // res.json(result);
    res.json(posts[0]);
  } catch (error) {
    res.json({ fatal: error.message });
  }
};

// const aceptar = async (req, res) => {
//   try {
//     const { id_reserva } = req.params;
//     const [result] = await Blog.aceptarById(id_reserva, req.body.aceptada);
//     const [reserva] = await Blog.reservaById(id_reserva);
//     res.json(reserva)
//   } catch (error) {
//     res.json({ fatal: error.message });
//   }
// }
module.exports = {
  getAll,
  getById,
  getByCategory,
  remove,
  update,
  create
  // aceptar
};
