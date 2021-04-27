import React, { useState } from 'react';
import GradeDataService from '../services/GradeService';

const AddGrade = () => {
  const initialGradeState = {
    id: null,
    name: '',
    subject: '',
    type: '',
    value: '',
  };
  const [grade, setGrade] = useState(initialGradeState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setGrade({ ...grade, [name]: value });
  };

  const saveGrade = () => {
    var data = {
      name: grade.name,
      subject: grade.subject,
      type: grade.type,
      value: grade.value,
    };

    GradeDataService.create(data)
      .then((response) => {
        setGrade({
          id: response.data.id,
          name: response.data.name,
          subject: response.data.img,
          type: response.data.type,
          value: response.data.value,
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const newGrade = () => {
    setGrade(initialGradeState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>Grade adicionada com sucesso!</h4>
          <button className="btn btn-success" onClick={newGrade}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="name">Nome</label>
            <input
              type="text"
              className="form-control"
              id="name"
              required
              value={grade.name}
              onChange={handleInputChange}
              name="name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="subject">Matéria</label>
            <input
              type="text"
              className="form-control"
              id="subject"
              required
              value={grade.subject}
              onChange={handleInputChange}
              name="subject"
            />
          </div>
          <div className="form-group">
            <label htmlFor="type">Tipo</label>
            <input
              type="text"
              className="form-control"
              id="type"
              required
              value={grade.type}
              onChange={handleInputChange}
              name="type"
            />
          </div>
          <div className="form-group">
            <label htmlFor="value">Nota</label>
            <input
              type="Number"
              className="form-control"
              id="value"
              required
              value={grade.value}
              onChange={handleInputChange}
              name="value"
            />
          </div>
          <button onClick={saveGrade} className="btn btn-success">
            Enviar
          </button>
        </div>
      )}
    </div>
  );
};

export default AddGrade;
