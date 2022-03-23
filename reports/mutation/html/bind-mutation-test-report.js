document.querySelector('mutation-test-report-app').report = {"files":{"/home/queite/trybe/projetos/front-end/sd-019-a-project-react-testing-library/src/components/PokemonDetails.js":{"language":"javascript","mutants":[{"id":"2","location":{"end":{"column":61,"line":17},"start":{"column":43,"line":17}},"mutatorName":"StringLiteral","replacement":"\"\"","status":"Killed"},{"id":"4","location":{"end":{"column":26,"line":30},"start":{"column":14,"line":30}},"mutatorName":"StringLiteral","replacement":"\"\"","status":"Killed"},{"id":"1","location":{"end":{"column":34,"line":17},"start":{"column":26,"line":17}},"mutatorName":"StringLiteral","replacement":"\"\"","status":"Killed"},{"id":"0","location":{"end":{"column":42,"line":13},"start":{"column":15,"line":13}},"mutatorName":"StringLiteral","replacement":"\"\"","status":"Killed"},{"id":"3","location":{"end":{"column":24,"line":29},"start":{"column":15,"line":29}},"mutatorName":"StringLiteral","replacement":"\"\"","status":"Killed"},{"id":"6","location":{"end":{"column":40,"line":80},"start":{"column":15,"line":80}},"mutatorName":"StringLiteral","replacement":"\"\"","status":"Killed"},{"id":"5","location":{"end":{"column":34,"line":53},"start":{"column":13,"line":53}},"mutatorName":"StringLiteral","replacement":"\"\"","status":"Killed"}],"source":"import React from 'react';\nimport PropTypes from 'prop-types';\n\nimport { isPokemonFavoriteByIdType, pokemonType } from '../types';\nimport Pokemon from './Pokemon';\n\nimport './pokemon-details.css';\n\nclass PokemonDetails extends React.Component {\n  static renderHabitat({ foundAt, name }) {\n    return (\n      <section>\n        <h2>{ `Game Locations of ${name}` }</h2>\n        <div className=\"pokemon-habitat\">\n          { foundAt.map(({ location, map }) => (\n            <div key={ location }>\n              <img src={ `${map}` } alt={ `${name} location` } />\n              <p><em>{ location }</em></p>\n            </div>\n          )) }\n        </div>\n      </section>\n    );\n  }\n\n  static renderSummary({ summary }) {\n    return (\n      <section>\n        <h2>{ `Summary` }</h2>\n        <p>{ `${summary}` }</p>\n      </section>\n    );\n  }\n\n  constructor(props) {\n    super(props);\n\n    this.renderFavoriteInput = this.renderFavoriteInput.bind(this);\n  }\n\n  findPokemon(givenId) {\n    const { pokemons } = this.props;\n\n    return pokemons.find(({ id }) => id === givenId);\n  }\n\n  renderFavoriteInput(pokemonId, isFavorite) {\n    const { onUpdateFavoritePokemons } = this.props;\n\n    return (\n      <form className=\"favorite-form\">\n        <label htmlFor=\"favorite\">\n          { `Pokémon favoritado?` }\n          <input\n            type=\"checkbox\"\n            id=\"favorite\"\n            checked={ isFavorite }\n            onChange={\n              ({ target: { checked } }) => onUpdateFavoritePokemons(pokemonId, checked)\n            }\n          />\n        </label>\n      </form>\n    );\n  }\n\n  render() {\n    const { renderHabitat, renderSummary } = PokemonDetails;\n    const { renderFavoriteInput } = this;\n    const {\n      match: { params: { id } },\n      isPokemonFavoriteById,\n    } = this.props;\n\n    const pokemon = this.findPokemon(parseInt(id, 10));\n    const isFavorite = isPokemonFavoriteById[id];\n\n    return (\n      <section className=\"pokemon-details\">\n        <h2>{ `${pokemon.name} Details` }</h2>\n        <Pokemon\n          pokemon={ pokemon }\n          showDetailsLink={ false }\n          isFavorite={ isFavorite }\n        />\n        { renderSummary(pokemon) }\n        { renderHabitat(pokemon) }\n        { renderFavoriteInput(pokemon.id, isFavorite) }\n      </section>\n    );\n  }\n}\n\nPokemonDetails.propTypes = {\n  isPokemonFavoriteById: isPokemonFavoriteByIdType.isRequired,\n  match: PropTypes.shape({\n    params: PropTypes.shape({\n      id: PropTypes.string.isRequired,\n    }).isRequired,\n  }).isRequired,\n  onUpdateFavoritePokemons: PropTypes.func.isRequired,\n  pokemons: PropTypes.arrayOf(pokemonType.isRequired).isRequired,\n};\n\nexport default PokemonDetails;\n"}},"schemaVersion":"1.0","thresholds":{"high":80,"low":60,"break":null}};