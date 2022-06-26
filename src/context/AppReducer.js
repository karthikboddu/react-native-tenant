export default (state, action) => {

  switch (action.type) {
    case 'GET_TASKS':
      return {
        ...state,
        screenLoading: false,
        allTasksList: action.payload
      }
    case 'RETRIEVE_TOKEN':
      return {
        ...state,
        userToken: action.payload,
        isLoading: false,
      };
    case 'SIGN_IN':
      return {
        ...state,
        userToken: action.payload,
        screenLoading: false,
      };
    case 'LOGOUT':
      return {
        ...state,
        userToken: null,
        isLoading: false,
      };
    case 'REGISTER':
      return {
        ...state,
        userName: action.id,
        userToken: action.token,
        isLoading: false,
      };
    case 'SET_DARK_THEME':
      return {
        ...state,
        isDarkTheme: true,
      };
    case 'GET_USER_DETAILS':
      return {
        ...state,
        userDetails: action.payload,
      };
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };
    case 'SET_SCREENLOADING':
      return {
        ...state,
        screenLoading: action.payload,
      };
    case 'SET_POPUP':
        return {
          ...state,
          popupLoading: action.payload,
        };      
    case 'GET_USERACTIVITY':
      return {
        ...state,
        userLoginActivity: action.payload,
      };
    case 'GET_TENANTBUILDING_LIST':
      return {
        ...state,
        tenantBuildingList: action.payload,
      };
    case 'GET_TENANTBUILDING_BYID_LIST':
      return {
        ...state,
        tenantBuildingListById: action.payload,
      };
    case 'GET_TENANTBUILDINGFLOOR_BYID_LIST':
      return {
        ...state,
        tenantBuildingFloorList: action.payload,
      };
    case 'GET_TENANTBUILDINGFLOOR_ROOM_BYID_LIST':
      return {
        ...state,
        tenantBuildingFloorRoomsList: action.payload,
      };
    case 'GET_TENANTBUILDINGFLOOR_ROOM_BYROOMID_LIST':
        return {
          ...state,
          tenantBuildingFloorRoomsDetails: action.payload,
        };      

    case 'CLEAR_STATE':
      return {
        ...state,
        tenantBuildingFloorList: [],
        tenantBuildingListById: [],
        tenantBuildingFloorRoomsList: [],
      };

    case 'GET_TENANT_PAYTM_TOKEN':
        return {
          ...state,
          txnToken: action.payload,
        };   
    case 'SET_USERTYPE_ADMIN':
          return {
            ...state,
            isAdmin: action.payload,
          };  
    case 'START_PAYTM_TRANSACTION':
            return {
              ...state,
              paytmTransactionResponse: action.payload,
            };   
            
    case 'GET_TENANT_ORDER_ROOM_LIST':
            return {
                ...state,
                tenantRoomOrderDetails: action.payload
              };  
              
    case 'POST_INIT_TENANT_ORDER_ROOM_PAYMENT':
            return {
                    ...state,
                    initRoomOrderPayment: action.payload,
                  }; 
    case 'GET_TENANT_ORDER_ROOM_ALL_LIST':
          console.log(state,"state.tenantRoomOrderDetailsAll")
          return {
            ...state,
            tenantRoomOrderDetailsAll:   [...state.tenantRoomOrderDetailsAll, action.payload]
          };                           

    default:
      return state;
  }
}