package com.example.lab1.profile;

import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class ProfileService {

    private final ProfileRepository profileRepository;

    public ProfileService(ProfileRepository profileRepository) {
        this.profileRepository = profileRepository;
    }

    public List<Profile> getAll() {
        return profileRepository.findAll()
                .stream()
                .sorted((a, b) -> Long.compare(b.getId(), a.getId()))
                .toList();
    }

    public List<Profile> search(String name, String skills) {
        return profileRepository.search(name, skills);
    }

    public Profile create(Profile profile) {
        return profileRepository.save(profile);
    }

    public Profile getById(Long id) {
        return profileRepository.findById(id)
                .orElseThrow(() -> new ProfileNotFoundException(id));
    }

    public Profile update(Long id, Profile input) {
        Profile existing = getById(id);
        existing.setFname(input.getFname());
        existing.setLname(input.getLname());
        existing.setEmail(input.getEmail());
        existing.setPs(input.getPs());
        existing.setGroup(input.getGroup());
        existing.setDETAILS(input.getDETAILS());
        existing.setSKILLS(input.getSKILLS());
        return profileRepository.save(existing);
    }

    public void delete(Long id) {
        if (!profileRepository.existsById(id)) {
            throw new ProfileNotFoundException(id);
        }
        profileRepository.deleteById(id);
    }
}
