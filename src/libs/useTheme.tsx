export const useTheme= ()=>{

    const logoUrl = ""

    return {
        primary:   "rgba(0, 0, 102, 1)",
        secondary: "rgba(229, 50, 13, 1)",
        logo: "",
        name: "",
        logoSource: logoUrl ? {uri: logoUrl} : require("@/assets/image/logo.png")
    }
}