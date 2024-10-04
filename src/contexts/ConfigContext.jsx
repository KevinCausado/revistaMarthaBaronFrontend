import PropTypes from 'prop-types';
import React, { createContext, useContext, useEffect, useReducer } from 'react';
import * as actionType from '../store/actions';
import { CONFIG } from '../config/constant';
import { useState } from 'react';
import { useCol } from 'react-bootstrap/esm/Col';
import AuthRequest from 'api/auth/AuthRequest';

const initialState = {
  ...CONFIG,
  isOpen: [],
  isTrigger: []
};
const ConfigContext = createContext(initialState);
const { Provider } = ConfigContext;

const ConfigProvider = ({ children }) => {
  let trigger = [];
  let open = [];

  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case actionType.CHANGE_LAYOUT:
        return {
          ...state,
          layout: action.layout
        };
      case actionType.COLLAPSE_MENU:
        return {
          ...state,
          collapseMenu: !state.collapseMenu
        };
      case actionType.COLLAPSE_TOGGLE:
        if (action.menu.type === 'sub') {
          open = state.isOpen;
          trigger = state.isTrigger;

          const triggerIndex = trigger.indexOf(action.menu.id);
          if (triggerIndex > -1) {
            open = open.filter((item) => item !== action.menu.id);
            trigger = trigger.filter((item) => item !== action.menu.id);
          }

          if (triggerIndex === -1) {
            open = [...open, action.menu.id];
            trigger = [...trigger, action.menu.id];
          }
        } else {
          open = state.isOpen;
          const triggerIndex = state.isTrigger.indexOf(action.menu.id);
          trigger = triggerIndex === -1 ? [action.menu.id] : [];
          open = triggerIndex === -1 ? [action.menu.id] : [];
        }
        return {
          ...state,
          isOpen: open,
          isTrigger: trigger
        };
      case actionType.NAV_COLLAPSE_LEAVE:
        if (action.menu.type === 'sub') {
          open = state.isOpen;
          trigger = state.isTrigger;

          const triggerIndex = trigger.indexOf(action.menu.id);
          if (triggerIndex > -1) {
            open = open.filter((item) => item !== action.menu.id);
            trigger = trigger.filter((item) => item !== action.menu.id);
          }
          return {
            ...state,
            isOpen: open,
            isTrigger: trigger
          };
        }
        return { ...state };
      case actionType.NAV_CONTENT_LEAVE:
        return {
          ...state,
          isOpen: open,
          isTrigger: trigger
        };
      case actionType.RESET:
        return {
          ...state,
          layout: initialState.layout,
          collapseMenu: initialState.collapseMenu
        };
      default:
        throw new Error();
    }
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

ConfigProvider.propTypes = {
  children: PropTypes.object
};

// --------------------------------------------------------------------------

const AuthContext = createContext();

const UseAuth = () => {
  const contexto = useContext(AuthContext);

  if (!contexto) {
    throw new Error('/UseAuth/ debe estar dentro de /AuthProvider/');
  }

  return contexto;
};

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errorMessage,setErrorMessage] = useState([])  

  useEffect(() => {
    const token = localStorage.getItem('Token');
    const rol = localStorage.getItem('Rol');
    if (token) {
      setIsAuthenticated(true);
      setRol(rol);
    }
  }, []);

  const login = async (user) => {
    try {
      const response = await AuthRequest.login(user);

      //Almaceno el token y el rol
      localStorage.setItem('Token', response?.token);
      localStorage.setItem('Rol', response?.rol);

      console.log('Token Guardado;', localStorage.getItem('Token'));   

      setUser({ ...response });
      console.log('Mensaje Servidor:', response);
      setIsAuthenticated(true);
      return response;
    } catch (error) {
      console.log('Error desde configContext', error);
      if (error.response?.status === 401) {
        setErrorMessage(...['Credenciales invalidas'])
        setShowError(true)
      }
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('Token');
    setIsAuthenticated(false);
  };

  const values = {
    user,
    isAuthenticated,
    errorMessage,    
    login,
    logout
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export { ConfigContext, ConfigProvider, AuthContext, UseAuth, AuthProvider };
