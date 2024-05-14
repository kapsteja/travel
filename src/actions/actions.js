const setUser = (userObj) => {
    return {
        type: "SET_USER",
        payload: userObj
    }
}

const admin = (adminObj) => {
    return {
        type: "SET_ADMIN",
        payload: adminObj
    }
}

const zoneAdmin = (zoneAdminObj) => {
    return {
        type: "SET_ZONE_ADMIN",
        payload: zoneAdminObj
    }
}

const vendor = (vendorObj) => {
    return {
        type: "SET_VENDOR",
        payload: vendorObj
    }
}

const logOut = () => {
    return {
        type: "LOG_OUT"
    }
}

export default {
    setUser,
    logOut,
    admin,
    zoneAdmin,
    vendor
}