module.exports = function(req, res, next) {
    const { email, password, name, nas, ville, adressederue, codepostal } = req.body;

    function validEmail(userEmail) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
    }

    // Common validation for all routes
    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
    }

    if (!validEmail(email)) {
        return res.status(400).json({ error: "Invalid email format" });
    }

    // Additional validation for registration
    if (req.path === "/register/client") {
        if (!name || !nas || !ville || !adressederue || !codepostal) {
            return res.status(400).json({ 
                error: "Registration requires: name, NAS, city, street address, and postal code" 
            });
        }
    }

    next();
};