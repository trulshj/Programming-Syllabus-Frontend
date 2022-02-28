import { Component } from "react";
import { Form, Row, Col, Container, Button } from "react-bootstrap";
import { newArticle } from "../../api/article.service";
import { Article, File } from "../../types/Article";

export default class NewArticle extends Component {
    componentDidMount() {
        if (!localStorage.getItem("userId")) {
            window.location.href = "/login";
        }
    }

    render() {
        let article: Article = {
            id: 0,
            title: "",
            authorId: localStorage.getItem("userId") || "",
            description: "",
            timeToComplete: 10,
            Images: [],
            Files: [],
            Grades: [],
            Subjects: [],
            Tools: [],
            Themes: [],
            published: false,
            viewCounter: 0,
            createdAt: "",
            updatedAt: "",
        };
        let image;
        let tempFiles: any = [];
        return (
            <div>
                <Container>
                    <Form>
                        <Row>
                            <Col>
                                <Form.Label style={{ float: "left" }}>
                                    Last opp bilde :
                                </Form.Label>
                                <Form.File
                                    id="exampleFormControlFile1"
                                    onChange={(newImage) => {
                                        image = newImage.target.files[0];
                                    }}
                                />
                                <Form.Label
                                    style={{ marginTop: "25%", float: "left" }}
                                >
                                    Last opp filer :
                                </Form.Label>
                                <Form.File
                                    multiple
                                    id="exampleFormControlFile1"
                                    onChange={(newFiles) => {
                                        tempFiles = newFiles.target.files;
                                    }}
                                />
                                <Form.Group controlId="exampleForm.ControlTextarea1">
                                    <Form.Label
                                        style={{
                                            marginTop: "25%",
                                            float: "left",
                                        }}
                                    >
                                        Verktøy som brukes :
                                    </Form.Label>
                                    <Form.Control
                                        style={{
                                            marginTop: "7%",
                                            border: "3px",
                                            borderStyle: "solid",
                                        }}
                                        as="textarea"
                                        rows={3}
                                    />
                                </Form.Group>
                                <Button
                                    style={{
                                        marginTop: "7%",
                                        marginRight: "15%",
                                    }}
                                    variant="primary"
                                    onClick={async () => {
                                        let filesToUpload: File[] = [];
                                        for (
                                            let i = 0;
                                            i < tempFiles.length;
                                            i++
                                        ) {
                                            filesToUpload.push(tempFiles[i]);
                                            article.Files.push(tempFiles[i]);
                                        }

                                        if (image) {
                                            article.Images.push({
                                                altText: "",
                                                fileId: image.name.toString(),
                                            });
                                            filesToUpload.push(image);
                                        }
                                        await newArticle(
                                            article,
                                            filesToUpload
                                        ).then(async (res) => {
                                            console.log(
                                                "new article status:",
                                                res
                                            );
                                            if (res) {
                                                window.location.href =
                                                    "/articlelist/myarticles";
                                            }
                                        });
                                    }}
                                >
                                    Lagre
                                </Button>
                                <Button
                                    style={{
                                        marginTop: "7%",
                                        marginLeft: "15%",
                                    }}
                                    variant="primary"
                                >
                                    Tilbake
                                </Button>
                            </Col>
                            <Col>
                                <Form.Label style={{ float: "left" }}>
                                    Oppgavetilttel
                                </Form.Label>
                                <Form.Control
                                    style={{
                                        border: "3px",
                                        borderStyle: "solid",
                                    }}
                                    placeholder="Oppgavetittel"
                                    onChange={(evnet) => {
                                        article.title = evnet.target.value;
                                    }}
                                />
                                <Form.Label
                                    style={{ marginTop: "5%", float: "left" }}
                                >
                                    Fagkode
                                </Form.Label>
                                <Form.Control
                                    style={{
                                        border: "3px",
                                        borderStyle: "solid",
                                    }}
                                    placeholder="Fagkode"
                                />
                                <Form.Label
                                    style={{ marginTop: "5%", float: "left" }}
                                >
                                    Årstrinn
                                </Form.Label>
                                <Form.Control
                                    defaultValue={0}
                                    onChange={(event) => {
                                        article.Grades = [];
                                        if (Number(event.target.value)) {
                                            article.Grades.push({
                                                id: Number(event.target.value),
                                                name: "event.target.value",
                                            });
                                        }
                                    }}
                                    style={{
                                        border: "3px",
                                        borderStyle: "solid",
                                    }}
                                    as="select"
                                >
                                    <option>ingen årstrinn</option>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                    <option>6</option>
                                    <option>7</option>
                                    <option>8</option>
                                    <option>9</option>
                                    <option>10</option>
                                    <option>11</option>
                                    <option>12</option>
                                    <option>13</option>
                                </Form.Control>
                                <Form.Label
                                    style={{ marginTop: "5%", float: "left" }}
                                >
                                    Tema
                                </Form.Label>
                                <Form.Control
                                    style={{
                                        border: "3px",
                                        borderStyle: "solid",
                                    }}
                                    placeholder="Tema"
                                />
                                <Form.Group controlId="exampleForm.ControlTextarea1">
                                    <Form.Label
                                        style={{
                                            marginTop: "5%",
                                            float: "left",
                                        }}
                                    >
                                        Beskrivelde :
                                    </Form.Label>
                                    <Form.Control
                                        style={{
                                            marginTop: "7%",
                                            border: "3px",
                                            borderStyle: "solid",
                                        }}
                                        as="textarea"
                                        rows={3}
                                        onChange={(evnet) => {
                                            article.description =
                                                evnet.target.value;
                                        }}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                    </Form>
                </Container>
            </div>
        );
    }
}
