import React, { useState, useEffect } from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";

import api from "../api";
import Header from "../components/Header";
import "./consultoria.css";

export default function Consultorias() {
    const [consultorias, setconsultorias] = useState([]);
    const [consultoria, setconsultoria] = useState();
    const [normas, setnormas] = useState([]);
    const [norma, setnorma] = useState();
    const [data, setdata] = useState();
    const [acao, setacao] = useState();

    useEffect(() => {
        fetch("http://localhost:3002")
            .then((resp) => resp.json())
            .then(function (data) {
                setconsultorias(data);
                setconsultoria(data[0]);
            })
            .catch(function (error) {
                console.log(error);
            });

        fetch("http://localhost:3003")
            .then((resp) => resp.json())
            .then(function (data) {
                setnormas(data);
                setnorma(data[0].codigo);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);

    const selectConsultoria = (e) => {
        let codigo = e.target.value;
        fetch("http://localhost:3002/" + codigo)
            .then((resp) => resp.json())
            .then(function (data) {
                setconsultoria(data);
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    const selectNorma = (e) => {
        setnorma(e.target.value);
    };

    const selectData = (e) => {
        setdata(e.target.value);
    };

    const selectAcao = (e) => {
        setacao(e.target.value);
    };

    const salvaAcao = () => {
        const planoAcao = {
            data,
            norma,
            acao,
        };
        fetch("http://localhost:3002/" + consultoria.codigo, {
            method: "POST",
            body: JSON.stringify(planoAcao),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        })
            .then(function (res) {
                fetch("http://localhost:3002")
                    .then((resp) => resp.json())
                    .then(function (data) {
                        setconsultorias(data);
                        console.log(data);
                        const novaConsultoria = data.filter(c => c.codigo == consultoria.codigo);
                        setconsultoria(novaConsultoria[0]);
                        setdata("");
                        setacao("");
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    return (
        <>
            <Header />
            <div className="container-consultorias">
                <div className="titulo">Gestão de consultorias</div>
                <div className="row">
                    <label>Empresa:</label>
                    <div className="col-6">
                        <select class="form-select form-select-md mb-3" onChange={selectConsultoria}>
                            {consultorias.map((n) => (
                                <option key={n.codigo} value={n.codigo}>
                                    {n.empresa}
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
                {consultoria && (
                    <div>
                        <div className="row">
                            <div className="col-md-2 col-sm-12">
                                Código:
                                <br /> <strong>{consultoria.codigo}</strong>
                            </div>
                            <div className="col-md-6 col-sm-12">
                                Empresa:
                                <br /> <strong>{consultoria.empresa}</strong>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                Objetivo:
                                <br /> <strong>{consultoria.objetivo}</strong>
                            </div>
                        </div>
                        <div className="row">
                            <label>Plano de ação:</label>
                            <div className="col">
                                <div className="plano">
                                    <Table>
                                        <Thead>
                                            <Tr>
                                                <Th>Data</Th>
                                                <Th>Norma</Th>
                                                <Th>Ação</Th>
                                                <Th></Th>
                                            </Tr>
                                        </Thead>
                                        <Tbody>
                                            {consultoria.plano.map((p) => (
                                                <Tr key={p.data}>
                                                    <Td>{p.data}</Td>
                                                    <Td>{p.norma}</Td>
                                                    <Td>{p.acao}</Td>
                                                    <Td></Td>
                                                </Tr>
                                            ))}
                                            <Tr>
                                                <Td>
                                                    <input
                                                        type="text"
                                                        style={{ width: "90%" }}
                                                        className="form-control"
                                                        placeholder="Data"
                                                        onChange={selectData}
                                                        value={data}
                                                    />
                                                </Td>
                                                <Td>
                                                    <select style={{ width: "90%" }} className="form-select" onChange={selectNorma}>
                                                        {normas.map((n) => (
                                                            <option key={n.codigo} value={n.codigo}>
                                                                {n.codigo}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </Td>
                                                <Td>
                                                    <input
                                                        type="text"
                                                        style={{ width: "90%" }}
                                                        className="form-control"
                                                        placeholder="Ação"
                                                        onChange={selectAcao}
                                                        value={acao}
                                                    />
                                                </Td>
                                                <Td>
                                                    <button className="add" style={{ width: "90%" }} onClick={() => salvaAcao()}>
                                                        Adicionar
                                                    </button>
                                                </Td>
                                            </Tr>
                                        </Tbody>
                                    </Table>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
