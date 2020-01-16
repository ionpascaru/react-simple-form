import React from 'react'

const validators = {
  name: val => val.length > 3
}

class UserForm extends React.Component {
  state = {
    data: {name: ""
    },
    errors: {name: true
    },
    touch: {name: false
    }
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.props.onAddUser(this.state.data)
    // call parent function
  }

  handleBlur = (event) => {
    this.setState({touch:{name: true}})
    // means in and out
  }


  handleChange = (event) => {
    //const name = event.target.name
    const value = event.target.value
    this.setState({ data: { name: value}, errors :{name: !validators.name(value)}})
    const valid = validators.name(value)
    //const valid = validators[name](value)

    // use event.target!!
    // change state.data and state.error ;)
  }

  render() {
    const { errors, data, touch } = this.state
    const anyError = Object.values(errors).some(x => x)

    return (
      <div className="UserForm">
        <form onSubmit={this.handleSubmit} className="mb-4">
          <div className="mb-4">
            <label htmlFor="name">Name</label>

            <input
              type="text"
              className={`form-control ${errors.name && touch.name ? "is-invalid" : ""}`}
              id="name"
              autoComplete="off"
              value={data.name}
              onBlur={this.handleBlur}
              onChange={this.handleChange}
              placeholder="Name" />

            {errors.name && (
              <div className="invalid-feedback">
                Must be > 3
              </div>
            )}
          </div>

          <button disabled={anyError} type="submit" className="btn btn-primary">
            Add
          </button>
        </form>

        <pre className="bg-light p-2">
          {JSON.stringify(this.state, null, "  ")}
        </pre>
      </div>
    )
  }
}

export default UserForm
