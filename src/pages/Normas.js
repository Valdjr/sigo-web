import React, { useState, useEffect } from "react";

import api from "../api";
import Header from "../components/Header";
import "./normas.css";

export default function Normas() {
    const [normas, setnormas] = useState([]);
    const [norma, setnorma] = useState();

    useEffect(() => {
        (async () => {
            const res = await api.get("http://localhost:3003");
            console.log(res.data);
            if (res.data) {
                setnormas(res.data);
                setnorma(res.data[0]);
            }
        })();
    }, []);

    const selectNorma = async (e) => {
        let codigo = e.target.value;
        const res = await api.get("http://localhost:3003/" + codigo);
        if (res) {
            setnorma(res.data);
        }
    };

    return (
        <>
            <Header />
            <div className="container-normas">
                <div className="titulo">Gestão de normas</div>
                <div className="row">
                    <label>Norma:</label>
                    <div className="col-6">
                        <select class="form-select form-select-md mb-3" onChange={selectNorma}>
                            {normas.map((n) => (
                                <option key={n.codigo} value={n.codigo}>
                                    {n.codigo}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="col-6">
                        <button className="btn">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                            </svg>
                        </button>
                        <button className="btn">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
                                <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                            </svg>
                        </button>
                    </div>
                </div>
                {norma && (
                    <div>
                        <div class="row">
                            <div className="col-md-2 col-sm-12">
                                Data de Publicação:
                                <br /> <strong>{norma.dataPublicacao}</strong>
                            </div>
                            <div className="col-md-2 col-sm-12">
                                Data de Atualização:
                                <br /> <strong>{norma.dataAtualizacao}</strong>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-2 col-sm-12">
                                Código:
                                <br /> <strong>{norma.codigo}</strong>
                            </div>
                            <div className="col-md-6 col-sm-12">
                                Titulo:
                                <br /> <strong>{norma.titulo}</strong>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                Link:
                                <br />{" "}
                                <strong>
                                    <a href={norma.link} target="_blank" rel="noreferrer">
                                        {norma.link}
                                    </a>
                                </strong>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-2 col-sm-12">
                                Organismo:
                                <br /> <strong>{norma.organismo}</strong>
                            </div>
                            <div className="col-md-2 col-sm-12">
                                Em vigor:
                                <br /> <strong>{norma.emVigor ? "Sim" : "Não"}</strong>
                            </div>
                            <div className="col-md-2 col-sm-12">
                                Departamento:
                                <br /> <strong>{norma.departamento}</strong>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                Objetivo:
                                <br /> <strong>{norma.objetivo}</strong>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
