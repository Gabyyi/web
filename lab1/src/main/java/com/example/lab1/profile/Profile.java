package com.example.lab1.profile;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "profiles")
public class Profile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "First name is required")
    @Size(max = 100)
    @Column(name = "fname", nullable = false, length = 100)
    private String fname;

    @NotBlank(message = "Last name is required")
    @Size(max = 100)
    @Column(name = "lname", nullable = false, length = 100)
    private String lname;

    @NotBlank(message = "Email is required")
    @Email(message = "Email must be valid")
    @Size(max = 200)
    @Column(nullable = false, unique = true, length = 200)
    private String email;

    @NotBlank(message = "Phone is required")
    @Size(max = 120)
    @Column(name = "ps", nullable = false, length = 120)
    private String ps;

    @NotBlank(message = "Group is required")
    @Size(max = 100)
    @Column(name = "group_name", nullable = false, length = 100)
    private String group;

    @Size(max = 2000)
    @Column(name = "details", length = 2000)
    private String DETAILS;

    @Size(max = 1000)
    @Column(name = "skills", length = 1000)
    private String SKILLS;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFname() {
        return fname;
    }

    public void setFname(String fname) {
        this.fname = fname;
    }

    public String getLname() {
        return lname;
    }

    public void setLname(String lname) {
        this.lname = lname;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPs() {
        return ps;
    }

    public void setPs(String ps) {
        this.ps = ps;
    }

    public String getGroup() {
        return group;
    }

    public void setGroup(String group) {
        this.group = group;
    }

    public String getDETAILS() {
        return DETAILS;
    }

    public void setDETAILS(String DETAILS) {
        this.DETAILS = DETAILS;
    }

    public String getSKILLS() {
        return SKILLS;
    }

    public void setSKILLS(String SKILLS) {
        this.SKILLS = SKILLS;
    }
}
