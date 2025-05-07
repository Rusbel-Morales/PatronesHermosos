const GrupoService = require("../services/grupo.service");

const GrupoController = {
	async registrarGrupos(req, res) {
		try {
			const {id_sede, grupos} = req.body;

			if (!id_sede) {
				return res.status(400).json({error: "El id_sede es requerido"});
			}

			if (!Array.isArray(grupos) || grupos.length === 0) {
				return res.status(400).json({error: "Se requiere un array de grupos"});
			}

			await GrupoService.registrarGrupos(grupos, id_sede);

			return res.status(201).json({message: "Grupos registrados con éxito"});
		} catch (error) {
			return res.status(500).json({error: "Error interno del servidor"});
		}
	},
	async obtenerGruposSede(req, res) {
		try {
			const {id_sede} = req.query;

			if (!id_sede) {
				return res.status(400).json({error: "Id de sede no proporcionado"});
			}

			const datosGruposSede = await GrupoService.obtenerGruposSede(id_sede);
			res.status(200).json(datosGruposSede);
		} catch (error) {
			res.status(500).json({error: error.message});
		}
	},
	async actualizarGrupos(req, res) {
		try {
			const { grupos, usuariosSinGrupo } = req.body;

			// Validar que grupos sea un array y no esté vacío
			if (!Array.isArray(grupos) || grupos.length === 0) {
				return res.status(400).json({error: "Se requiere un array de grupos"});
			}

			// Validar que cada actualización tenga un id_grupo
			for (const grupo of grupos) {
				if (!grupo.id_grupo) {
					return res.status(400).json({error: "Cada actualización debe incluir un id_grupo"});
				}
			}

			// Validar que el objeto updates no esté vacío
			if (!grupos || Object.keys(grupos).length === 0) {
				return res.status(400).json({error: "No se proporcionaron actualizaciones"});
			}

			await GrupoService.actualizarGrupos(grupos);
			await GrupoService.actualizarReferenciasUsuariosSinGrupo(usuariosSinGrupo);

			res.status(200).json({message: "Grupos actualizados con éxito"});
		} catch (error) {
			res.status(500).json({error: error.message});
		}
	},
	async generarGruposAutomaticos(req, res) {
		try {
			const { id_sede } = req.query;

			if (!id_sede) {
				return res.status(400).json({ error: "Id de sede no proporcionado" });
			}

			const generarGrupos = await GrupoService.generarGruposAutomaticos(id_sede);
			res.status(200).json(generarGrupos);
		} catch (error) {
			if (error.message === "No hay suficientes personas para cubrir todos los roles."){
				return res.status(409).json({ error: error.message });
			}
			res.status(500).json({ error: error.message })
		}
	},
	async eliminarGrupos(req, res) {
		try {
			const grupos = req.body;

			if (!Array.isArray(grupos) || grupos.length === 0) {
				return res.status(400).json({ error: "Se requiere un array de grupos" });
			}

			for (const id of grupos) {
				if (typeof id !== 'number') {
					return res.status(400).json({ error: "Cada grupo debe ser un id numérico" });
				}
			}

			await GrupoService.eliminarGrupos(grupos);
			res.status(200).json({ message: "Grupos eliminados con éxito" });
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	}
}

module.exports = GrupoController;