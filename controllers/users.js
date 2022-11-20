import User from "../models/user.js";

export const showRegister = (req, res) => {
  res.render("users/register");
};

export const register = async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const user = new User({ email, username });
    const registeredUser = await User.register(user, password);
    req.login(registeredUser, (err) => {
      if (err) return next(err);
      req.flash("success", "Welcome to Yelp Camp!");
      res.redirect("/campgrounds");
    });
  } catch (error) {
    req.flash("error", error.message);
    res.redirect("/register");
  }
};

export const showLogin = (req, res) => {
  res.render("users/login");
};

export const loginUser = (req, res) => {
  req.flash("success", "Welcome back!");
  const redirectUrl = req.session.returnTo || "/campgrounds";
  delete req.session.returnTo;
  res.redirect("/campgrounds");
};

export const logoutUser = (req, res) => {
  req.logout(function (err) {
    if (err) return next(err);
    req.flash("success", "You've logged out!");
    res.redirect("/campgrounds");
  });
};
