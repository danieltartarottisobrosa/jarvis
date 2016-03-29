(global => {
  
  const readArgs = args => {
    const paths = []
    let filters = {}
    let properties = []
    let implementation = input => input

    for (let arg of args) {
      const type = typeof arg

      switch (type) {
        case "string":
          paths.push(arg)
          break

       case "object":
          if (Array.isArray(arg))
            properties = arg
          else
            filters = arg
          break;

        case "function":
          implementation = arg
          break

          default:
          continue
      }
    }

    return [ paths, properties, filters, implementation ]
  }
  
  const recursiveMount = (tokens, context, data) => {
    let token = tokens.shift()
    
    // Se acabou os tokens retorna o último contexto
    if (typeof token === "undefined") return context
    
    token = token.trim()
    
    // Se ainda não existe este contexto
    if (typeof context[token] === "undefined") {
      if (token.indexOf("(") === -1) {
        // Se não tiver parâmetros
        context[token] = {}
        
      } else {
        // Se tiver parâmetros
        const splitAux = token.split("(")
        token = splitAux[0]
        const params = splitAux[1].substr(0, splitAux[1].length - 1).split(",")

        context[token] = function() {
          for (let i = 0; i < params.length; i++)
            data[params[i].trim()] = arguments[i]
          
          return context[token];
        }
      }
    }
    
    return recursiveMount(tokens, context[token], data)
  }
  
  const register = function(/* rest */) {
    const [ paths, properties, filters, implementation ] = readArgs(arguments)
    const input = {}
    
    for (let path of paths) {
      let lastContext = recursiveMount(path.split("."), this, input)
      
      for (let prop of properties) {
        lastContext[prop] = val => {
          input[prop] = typeof filters[prop] === "undefined" ? val : filters[prop](val)
          return lastContext
        }
      }
      
      lastContext[this.options.executeMethodName] = function() {
        return implementation(input)
      }
    }
    return this;
  }
  
  const create = (options = { executeMethodName: "now" }) => {
    return {
      register,
      create,
      options
    }
  }
  
  global.Jarvis = create()
  
})(typeof window === "undefined" ? module.exports : window)